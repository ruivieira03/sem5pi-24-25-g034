using System.Threading.Tasks;

namespace Hospital.Domain.Patients{
    public interface IPatientRepository{
        Task<Patient> GetByIdAsync(PatientId id); // Get patient by Id
        Task<Patient> GetMedicalRecordNumberAsync(int medicalRecordNumber); // Get patient by Medical Record Number
        Task<Patient> GetPatientByEmailAsync(string email); // Get patient by Email
        Task<Patient> GetPatientByPhoneNumberAsync(string phoneNumber); // Get patient by PhoneNumber
        Task AddPatientAsync(Patient patient); // Add a new patient
        Task UpdatePatientAsync(Patient patient); // Update an existing patient
        Task Remove(Patient patient); // Remove a patient
        Task<List<Patient>> GetAllAsync(); // Get all patients
    }
}
