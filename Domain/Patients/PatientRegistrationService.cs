using System;
using System.Threading.Tasks;
using Hospital.Domain.Users.SystemUser;
using Hospital.Services;
using Hospital.ViewModels;
using Hospital.Domain.Shared;

namespace Hospital.Domain.Patients{
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
                throw new Exception("Email already taken.");                        // Bussines Rule , Verfiy Unique Email
        
            if (await _patientRepository.GetPatientByPhoneNumberAsync(model.PhoneNumber) != null)
                throw new Exception("Phone Number already in use.");                  // Bussines Rule , Verfiy Unique PhoneNumber

        
            var newPatient = new Patient(                                           // Create a new Patient from the registration model
                
                firstName: model.FirstName,         
                lastName: model.LastName,           
                dateOfBirth: model.DateOfBirth,     
                gender: model.Gender,                
                medicalRecordNumber: GenerateMedicalRecordNumber(), 
                email: model.Email,                  
                phoneNumber: model.PhoneNumber,      
                emergencyContact: model.EmergencyContact,
                appointmentHistory: model.AppointmentHistory,
                allergiesOrMedicalConditions: model.AllergiesOrMedicalConditions
            ); 
            await _patientRepository.AddPatientAsync(newPatient); // Save the patient to the repository  
            await _unitOfWork.CommitAsync();                // Commit the transaction

    
            return new PatientDto{                      // Return a DTO with the new patient’s details
               
                Id = newPatient.Id.AsGuid(),            // Assuming PatientId has an AsGuid method
                FirstName = newPatient.FirstName,
                LastName = newPatient.LastName,
                DateOfBirth = newPatient.DateOfBirth,
                Gender = newPatient.Gender,
                MedicalRecordNumber = newPatient.MedicalRecordNumber,
                Email = newPatient.Email,
                PhoneNumber = newPatient.PhoneNumber,
                EmergencyContact = newPatient.EmergencyContact,
                AppointmentHistory = newPatient.AppointmentHistory,
                AllergiesOrMedicalConditions = newPatient.AllergiesOrMedicalConditions
            };
        }

          
 
        //#TODO Change method to be sequencial
        public string GenerateMedicalRecordNumber(){

            var numberPatients = _patientRepository.GetAllAsync().Result.Count;

            string formattedDate = DateTime.Now.ToString("yyyyMM");
            string combinedString = $"{formattedDate}{numberPatients:D6}";  // Combine the date and zero-padded number
            string patientId = combinedString;
           
            return patientId;
            
    }
    
    
    }
}
