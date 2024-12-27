
namespace Hospital.Domain.Patients{
    public interface IPatientRepository{
<<<<<<< HEAD:Domain/Patients/IPatientRepository.cs

=======
>>>>>>> main:MDR/Domain/Patients/IPatientRepository.cs
        Task<Patient> GetByIdAsync(PatientId id); // Get patient by Id
        Task<Patient> GetMedicalRecordNumberAsync(string medicalRecordNumber); // Get patient by Medical Record Number
        Task<Patient> GetPatientByEmailAsync(string email); // Get patient by Email
        Task<Patient> GetPatientByPhoneNumberAsync(string phoneNumber); // Get patient by PhoneNumber
<<<<<<< HEAD:Domain/Patients/IPatientRepository.cs
        Task AddPatientAsync(Patient patient); // Add a new patient // Register
        Task UpdatePatientAsync(Patient patient); // Update an existing patient
        Task<List<Patient>> GetAllAsync(); // Get all patients
        Task Remove(Patient patient); // Removes Patient  Profile
        //Task SearchByAttributesAsync(Patients patients);
        
=======
        Task <Patient> GetByFirstNameAsync(string firstName);
        Task <Patient> GetByLastNameAsync(string lastName);
        Task <Patient> GetByGenderAsync(string gender);
        Task <Patient> GetDateOfBirthAsync(string dateOfBirth);
        Task <Patient> GetByAllergiesAsync(string allergies);
        Task <Patient> GetByAppointmentHistoryAsync(string AppointmentHistory);
        Task <Patient> GetByEmergencyContact(string EmergencyContact);
   


        Task<List<Patient>> GetAllAsync(); // Get all patients
        Task AddPatientAsync(Patient patient); // Add a new patient
        Task UpdatePatientAsync(Patient patient); // Update an existing patient
        Task Remove(Patient patient); // Remove a patient
     
>>>>>>> main:MDR/Domain/Patients/IPatientRepository.cs
    }
}
