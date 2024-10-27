using System;
using System.Threading.Tasks;
using Hospital.Domain.Users.SystemUser;
using Hospital.Services;
using Hospital.ViewModels;
using Hospital.Domain.Shared;

namespace Hospital.Domain.Patients
{
<<<<<<< Updated upstream
    public class PatientRegistrationService
    {
=======
    public class PatientRegistrationService{
>>>>>>> Stashed changes
        private readonly IUnitOfWork _unitOfWork;
        private readonly ISystemUserRepository _systemUserRepository;
        private readonly IEmailService _emailService;
        private readonly IPatientRepository _patientRepository;

<<<<<<< Updated upstream
        public PatientRegistrationService(IUnitOfWork unitOfWork, ISystemUserRepository systemUserRepository, IEmailService emailService, IPatientRepository patientRepository)
        {
=======
        public PatientRegistrationService(IUnitOfWork unitOfWork, ISystemUserRepository systemUserRepository, IEmailService emailService, IPatientRepository patientRepository) {
>>>>>>> Stashed changes
            this._unitOfWork = unitOfWork;
            this._systemUserRepository = systemUserRepository;
            this._emailService = emailService;
            this._patientRepository = patientRepository;
        }

<<<<<<< Updated upstream
        public async Task<PatientDto> RegisterPatientProfileAsync(PatientProfileViewModel model)
        {
            // Validate the email
            if (await _patientRepository.GetPatientByEmailAsync(model.Email) != null)
            {
                throw new Exception("Email already taken.");
            }

            // Verify if the Phone Number is already in use

            if (await _patientRepository.GetPatientByPhoneNumberAsync(model.PhoneNumber) != null)
            {
                throw new Exception("Phone Number already in use.");
            }

            // Create a new Patient from the registration model
=======
        public async Task<PatientDto> RegisterPatientProfileAsync(PatientProfileViewModel model){
            
            if (await _patientRepository.GetPatientByEmailAsync(model.Email) != null)
                throw new Exception("Email already taken.");            // Bussines Rule , Verfiy Unique Email
        
            if (await _patientRepository.GetPatientByPhoneNumberAsync(model.PhoneNumber) != null)
                throw new Exception("Phone Number already in use.");    // Bussines Rule , Verfiy Unique PhoneNumber


            // Create a new Patient from the registration model

>>>>>>> Stashed changes
            var newPatient = new Patient(
                firstName: model.FirstName,         
                lastName: model.LastName,           
                dateOfBirth: model.DateOfBirth,     
                gender: model.Gender,                
                medicalRecordNumber: model.MedicalRecordNumber, 
                email: model.Email,                  
                phoneNumber: model.PhoneNumber,      
                emergencyContact: model.EmergencyContact 
            );

<<<<<<< Updated upstream
            // Save the patient to the repository
            await _patientRepository.AddPatientAsync(newPatient);

            // Commit the transaction
            await _unitOfWork.CommitAsync();

            // Return a DTO with the new patient’s details
            return new PatientDto
            {
                Id = newPatient.Id.AsGuid(), // Assuming PatientId has an AsGuid method
=======
 
            await _patientRepository.AddPatientAsync(newPatient); // Save the patient on repository
            await _unitOfWork.CommitAsync();                    // Commit Transaction

            // Return a DTO with the new patient’s details
            return new PatientDto{
                Id = newPatient.Id.AsGuid(), // Assuming Patient has an AsGuid method
>>>>>>> Stashed changes
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

    }

}
