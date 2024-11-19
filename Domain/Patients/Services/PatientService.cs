using Hospital.Domain.Shared;
using Hospital.Services;
using Hospital.Domain.Users.SystemUser;
using Hospital.ViewModels;

namespace Hospital.Domain.Patients{
    public class PatientService{
        private readonly IPatientRepository _patientRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ISystemUserRepository _systemUserRepository;
        private readonly ILoggingService _loggingService;
        private readonly IEmailService _emailService;

        public PatientService(IPatientRepository patientRepository, IUnitOfWork unitOfWork, ISystemUserRepository systemUserRepository, ILoggingService loggingService, IEmailService emailService){
            _patientRepository = patientRepository;
            _unitOfWork = unitOfWork;
            _systemUserRepository = systemUserRepository;
            _loggingService = loggingService;
            _emailService = emailService;
        }


        public async Task<PatientDto> UpdateProfileAsUserAsync(UpdateProfileViewModel model, SystemUserId userId){
            if (model == null){
                throw new ArgumentNullException(nameof(model));
            }

            var existingUser = await _systemUserRepository.GetByIdAsync(userId);

            if (existingUser == null){
                throw new InvalidOperationException("User not found.");
            }

            string originalEmail = existingUser.Email;
            string originalPhoneNumber = existingUser.PhoneNumber;

            var existingPatient = await _patientRepository.GetPatientByEmailAsync(originalEmail);
            if (existingPatient == null){
                throw new InvalidOperationException("Patient not found.");
            }

            // Set the original patient to be able to set the changedFields in the log

            var originalPatientDto = new PatientDto{
                Id = existingPatient.Id.AsGuid(),
                FirstName = existingPatient.FirstName,
                LastName = existingPatient.LastName,
                DateOfBirth = existingPatient.DateOfBirth,
                Gender = existingPatient.Gender,
                Email = existingPatient.Email,
                PhoneNumber = existingPatient.PhoneNumber,
                EmergencyContact = existingPatient.EmergencyContact,
                AllergiesOrMedicalConditions = existingPatient.AllergiesOrMedicalConditions,
                AppointmentHistory = existingPatient.AppointmentHistory
            };


            // Update only the non-null properties
            
            if (model.FirstName != null) existingPatient.FirstName = model.FirstName;
            if (model.LastName != null) existingPatient.LastName = model.LastName;
            if (model.Gender != null) existingPatient.Gender = model.Gender;

            if (model.Email != null) {
                existingPatient.Email = model.Email;
                existingUser.Email = model.Email;
            }

            if (model.PhoneNumber != null) { 
                existingPatient.PhoneNumber = model.PhoneNumber;
                existingUser.PhoneNumber = model.PhoneNumber;
            }

            if (model.EmergencyContact != null) existingPatient.EmergencyContact = model.EmergencyContact;

            var newPatientDto = new PatientDto
            {
                Id = existingPatient.Id.AsGuid(),
                FirstName = existingPatient.FirstName,
                LastName = existingPatient.LastName,
                DateOfBirth = existingPatient.DateOfBirth,
                Gender = existingPatient.Gender,
                Email = existingPatient.Email,
                PhoneNumber = existingPatient.PhoneNumber,
                EmergencyContact = existingPatient.EmergencyContact,
                AllergiesOrMedicalConditions = existingPatient.AllergiesOrMedicalConditions,
                AppointmentHistory = existingPatient.AppointmentHistory
            };

            string changedFields = _loggingService.GetChangedFields(originalPatientDto, newPatientDto);
            
            await _loggingService.LogProfileUpdateAsync(existingPatient.Id.ToString(), changedFields, DateTime.UtcNow);
            
            if (originalEmail != newPatientDto.Email || originalPhoneNumber != newPatientDto.PhoneNumber) {
                // Generate and store the reset token
                existingUser.VerifyToken = existingUser.VerifyToken = Guid.NewGuid().ToString();
                existingUser.TokenExpiry = DateTime.UtcNow.AddHours(48); // Token valid for 48 hours
                existingUser.isVerified = false;

                string setupLink = _emailService.GenerateEmailVerification(newPatientDto.Email, existingUser.VerifyToken);

                await _emailService.SendEmailConfirmationEmailAsync(newPatientDto.Email, setupLink);
            }

            await _patientRepository.UpdatePatientAsync(existingPatient);

            await _systemUserRepository.UpdateUserAsync(existingUser);
            
            await _unitOfWork.CommitAsync();

            return newPatientDto;
        }

        


        // 5.8.7


        public async Task<PatientDto> UpdateProfileAsync(UpdatePatientProfileViewModel model, Guid patientId){
            
            if (model == null){
                throw new ArgumentNullException(nameof(model));
            }

            var existingPatient = await _patientRepository.GetByIdAsync(new PatientId(patientId));
           
            if (existingPatient == null){
                throw new InvalidOperationException("Patient not found.");
            }
            //update atributes

            existingPatient.FirstName = model.FirstName;
            existingPatient.LastName = model.LastName;
            existingPatient.Email = model.Email;
            existingPatient.PhoneNumber = model.PhoneNumber;
            existingPatient.EmergencyContact = model.EmergencyContact;

            await _patientRepository.UpdatePatientAsync(existingPatient);   // Update Database
            await _unitOfWork.CommitAsync();                                // Commit transaction on it

            return new PatientDto{
                Id = existingPatient.Id.AsGuid(),
                FirstName = existingPatient.FirstName,
                LastName = existingPatient.LastName,
                DateOfBirth = existingPatient.DateOfBirth,
                Email = existingPatient.Email,
                Gender = existingPatient.Gender,
                MedicalRecordNumber = existingPatient.MedicalRecordNumber,
                PhoneNumber = existingPatient.PhoneNumber,
                EmergencyContact = existingPatient.EmergencyContact,
                AllergiesOrMedicalConditions = existingPatient.AllergiesOrMedicalConditions,
                AppointmentHistory = existingPatient.AppointmentHistory,
            };
        }


           public async Task <PatientDto> DeleteAsync(PatientId patientId){

            var existingPatient = await _patientRepository.GetByIdAsync(patientId);
            
            if (existingPatient == null){
                throw new InvalidOperationException("Patient not found.");
            }

            await _patientRepository.Remove(existingPatient);
            await _unitOfWork.CommitAsync();


            return new PatientDto{
                Id = existingPatient.Id.AsGuid(),
                FirstName = existingPatient.FirstName,
                LastName = existingPatient.LastName,
                DateOfBirth = existingPatient.DateOfBirth,
                Email = existingPatient.Email,
                Gender = existingPatient.Gender,
                MedicalRecordNumber = existingPatient.MedicalRecordNumber,
                PhoneNumber = existingPatient.PhoneNumber,
                EmergencyContact = existingPatient.EmergencyContact,
                AllergiesOrMedicalConditions = existingPatient.AllergiesOrMedicalConditions,
                AppointmentHistory = existingPatient.AppointmentHistory,
            };
        }
    


       public async Task<List<PatientDto>> GetAllAsync(){
    var patients = await _patientRepository.GetAllAsync();
            List<PatientDto> patientDto= patients.ConvertAll(patient => new PatientDto { 

            Id = patient.Id.AsGuid(),
            FirstName = patient.FirstName,
            LastName = patient.LastName,
            DateOfBirth = patient.DateOfBirth,
            Gender = patient.Gender,
            Email = patient.Email,
            PhoneNumber = patient.PhoneNumber,
            EmergencyContact = patient.EmergencyContact,
            AllergiesOrMedicalConditions = patient.AllergiesOrMedicalConditions,            
             AppointmentHistory = patient.AppointmentHistory
            });
            return patientDto;
    }

           public async Task<PatientDto> GetByIdAsync(PatientId id){
            var patient = await this._patientRepository.GetByIdAsync(id);
            
            if (patient == null){
                throw new Exception("User not found.");
            }


         return new PatientDto { 

            Id = patient.Id.AsGuid(),
            FirstName = patient.FirstName,
            LastName = patient.LastName,
            DateOfBirth = patient.DateOfBirth,
            Gender = patient.Gender,
            Email = patient.Email,
            PhoneNumber = patient.PhoneNumber,
            EmergencyContact = patient.EmergencyContact,
            AllergiesOrMedicalConditions = patient.AllergiesOrMedicalConditions,            
            AppointmentHistory = patient.AppointmentHistory
            };
       
        }

    public async Task<PatientDto> GetPatientProfileAsync(PatientId userId)
    {
        // Fetch the patient by user ID
        var patient = await _patientRepository.GetByIdAsync(userId);
        if (patient == null)
        {
            throw new InvalidOperationException("Patient not found."); // Throw exception if patient not found
        }

        // Map the patient entity to a DTO (Data Transfer Object)
        var patientDto = new PatientDto
        {
            Id = patient.Id.AsGuid(),
            FirstName = patient.FirstName,
            LastName = patient.LastName,
            DateOfBirth = patient.DateOfBirth,
            Gender = patient.Gender,
            Email = patient.Email,
            PhoneNumber = patient.PhoneNumber,
            EmergencyContact = patient.EmergencyContact,
            AllergiesOrMedicalConditions = patient.AllergiesOrMedicalConditions,
            AppointmentHistory = patient.AppointmentHistory
        };

        return patientDto; // Return the patient DTO
    }

    }
}

    
