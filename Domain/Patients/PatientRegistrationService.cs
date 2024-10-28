using System;
using System.Threading.Tasks;
using Hospital.Domain.Users.SystemUser;
using Hospital.Services;
using Hospital.ViewModels;
using Hospital.Domain.Shared;

namespace Hospital.Domain.Patients
{
    public class PatientRegistrationService{
        private readonly IUnitOfWork _unitOfWork;
        private readonly ISystemUserRepository _systemUserRepository;
        private readonly IEmailService _emailService;
        private readonly IPatientRepository _patientRepository;

        public PatientRegistrationService(IUnitOfWork unitOfWork, ISystemUserRepository systemUserRepository, IEmailService emailService, IPatientRepository patientRepository) {
            this._unitOfWork = unitOfWork;
            this._systemUserRepository = systemUserRepository;
            this._emailService = emailService;
            this._patientRepository = patientRepository;
        }

        public async Task<PatientDto> RegisterPatientProfileAsync(PatientProfileViewModel model){
            
            if (await _patientRepository.GetPatientByEmailAsync(model.Email) != null)
                throw new Exception("Email already taken.");            // Bussines Rule , Verfiy Unique Email
        
            if (await _patientRepository.GetPatientByPhoneNumberAsync(model.PhoneNumber) != null)
                throw new Exception("Phone Number already in use.");    // Bussines Rule , Verfiy Unique PhoneNumber

            // Create a new Patient from the registration model

            var newPatient = new Patient(
                firstName: model.FirstName,         
                lastName: model.LastName,           
                dateOfBirth: model.DateOfBirth,     
                gender: model.Gender,                
                medicalRecordNumber: GenerateMedicalRecordNumber(), 
                email: model.Email,                  
                phoneNumber: model.PhoneNumber,      
                emergencyContact: model.EmergencyContact
            );

            // Save the patient to the repository
            await _patientRepository.AddPatientAsync(newPatient);

            // Commit the transaction
            await _unitOfWork.CommitAsync();

            // Return a DTO with the new patient’s details
            return new PatientDto   
            {
                Id = newPatient.Id.AsGuid(), // Assuming PatientId has an AsGuid method
                FirstName = newPatient.FirstName,
                LastName = newPatient.LastName,
                DateOfBirth = newPatient.DateOfBirth,
                Gender = newPatient.Gender,
                MedicalRecordNumber = newPatient.MedicalRecordNumber,
                Email = newPatient.Email,
                PhoneNumber = newPatient.PhoneNumber,
                EmergencyContact = newPatient.EmergencyContact
            };
        }


        /*

        // #TODO Change method to be sequencial
        public string GenerateMedicalRecordNumber(){

        MediCalRecordNumber mediCalRecordNumber = null;
        if( _patientReposiory.GetAllAsync()== 0)
          var numberPatients =0;

           var numberPatients = _patientReposiory.GetAllAsync()+1;

            string formattedDate = DateTime.Now.ToString("yyyyMM");
            string combinedString = $"{formattedDate}{numberPatients:D6}";  // Combine the date and zero-padded number
            string patientID = combinedString;
               
               return patientId;
            
    }
    */
        // #TODO Change method to be sequencial
        public string GenerateMedicalRecordNumber() 
        {
            var random = new Random();
            return random.Next(100000, 999999).ToString(); // Generates a 6-digit random number
        }

    }
}
