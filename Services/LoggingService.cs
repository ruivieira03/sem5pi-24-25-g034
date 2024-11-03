using Hospital.Infraestructure.Logs;
using Hospital.Services;
using Hospital.Domain.Shared;
using Hospital.Domain.Logs;
using Hospital.Domain.Patients;


namespace Hospital.Services
{
public class LoggingService : ILoggingService
{
    private readonly ILogRepository _logRepository;
    private readonly IUnitOfWork _unitOfWork;

    // Injecting the ILogRepository through the constructor
    public LoggingService(ILogRepository logRepository, IUnitOfWork unitOfWork)
    {
        _logRepository = logRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task LogProfileUpdateAsync(string userId, string changedFields, DateTime timestamp)
    {
        var logEntry = new ProfileUpdateLog
        {
            UserId = userId.ToString(),
            ChangedFields = changedFields,
            Timestamp = timestamp
        };

        await _logRepository.LogProfileUpdateAsync(logEntry); // Make sure to await this method
        await _unitOfWork.CommitAsync();
    }

    public async Task LogAccountDeletionAsync(string userId, DateTime timestamp)
    {
        var logEntry = new AccountDeletionLog
        {
            UserId = userId.ToString(),
            Timestamp = timestamp
        };

        await _logRepository.LogAccountDeletionAsync(logEntry); // Make sure to await this method
        await _unitOfWork.CommitAsync();
    }

    // Helper method to determine what fields have changed
    public string GetChangedFields(PatientDto existingPatient, PatientDto updatedPatient)
    {
        var changedFields = new List<string>();

        if (existingPatient.FirstName != updatedPatient.FirstName) changedFields.Add("FirstName");
        if (existingPatient.LastName != updatedPatient.LastName) changedFields.Add("LastName");
        if (existingPatient.Email != updatedPatient.Email) changedFields.Add("Email");
        if (existingPatient.PhoneNumber != updatedPatient.PhoneNumber) changedFields.Add("PhoneNumber");
        if (existingPatient.Gender != updatedPatient.Gender) changedFields.Add("Gender");
        if (existingPatient.EmergencyContact != updatedPatient.EmergencyContact) changedFields.Add("EmergencyContact");
        
        return string.Join(", ", changedFields);
    }

}

}
