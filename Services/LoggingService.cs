using Hospital.Infraestructure.Logs;
using Hospital.Services;
using Hospital.Domain.Shared;
using Hospital.Domain.Logs;
using Hospital.Domain.Users.SystemUser;

public class LoggingService
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
            UserId = userId,
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
            UserId = userId,
            Timestamp = timestamp
        };

        await _logRepository.LogAccountDeletionAsync(logEntry); // Make sure to await this method
        await _unitOfWork.CommitAsync();
    }

    // Helper method to determine what fields have changed
    public string GetChangedFields(SystemUser existingUser, SystemUserDto updatedUser)
    {
        var changedFields = new List<string>();

        if (existingUser.Username != updatedUser.Username) changedFields.Add("Username");
        if (existingUser.Email != updatedUser.Email) changedFields.Add("Email");
        if (existingUser.PhoneNumber != updatedUser.PhoneNumber) changedFields.Add("PhoneNumber");
        
        return string.Join(", ", changedFields);
    }

}
