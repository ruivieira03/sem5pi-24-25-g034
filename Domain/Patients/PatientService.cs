using System;
using System.Threading.Tasks;
using Hospital.Domain.Shared;
using Hospital.Infraestructure;

namespace Hospital.Domain.Patients
{

    public class PatientService
    {
        private readonly IPatientRepository _patientRepository;
        private readonly IUnitOfWork _unitOfWork;


        public PatientService(IPatientRepository patientRepository, IUnitOfWork unitOfWork)
        {
            _patientRepository = patientRepository;
            _unitOfWork = unitOfWork;
        }
       

        public async Task<PatientDto> UpdateProfileAsync(UpdateProfileViewModel model, Guid patientId)
        {
            // Validate the incoming model
            if (model == null)
            {
                throw new ArgumentNullException(nameof(model));
            }

            // Retrieve the existing patient record
            var existingPatient = await _patientRepository.GetByIdAsync(new PatientId(patientId));
            if (existingPatient == null)
            {
                throw new InvalidOperationException("Patient not found.");
            }

            // Update patient details
            existingPatient.FirstName = model.FirstName;
            existingPatient.LastName = model.LastName;
            existingPatient.DateOfBirth = model.DateOfBirth;
            existingPatient.Gender = model.Gender;
            existingPatient.Email = model.Email;
            existingPatient.PhoneNumber = model.PhoneNumber;
            existingPatient.EmergencyContact = model.EmergencyContact;
            existingPatient.AllergiesOrMedicalConditions = model.AllergiesOrMedicalConditions;

            await _patientRepository.UpdatePatientAsync(existingPatient);
            await _unitOfWork.CommitAsync();

            return new PatientDto{

                FirstName = existingPatient.FirstName,
                LastName = existingPatient.LastName,
                DateOfBirth = existingPatient.DateOfBirth,
                Gender = existingPatient.Gender,
                Email = existingPatient.Email,
                PhoneNumber = existingPatient.PhoneNumber,
                EmergencyContact = existingPatient.EmergencyContact,
                AllergiesOrMedicalConditions = existingPatient.AllergiesOrMedicalConditions
            };
        }

        /*


        public async Task<PatientDto> DeleteProfileAsync(Guid id){

            var patient = await _patientRepository.GetPatientByIdAsync(patient.Id);     // verifies Patient Already Exists
            
            if (patient == null){throw new BusinessRuleValidationException("Patient Not.");}
        
            bool isConfirmed = ConfirmDeletion();   //Confirmação de Exclusão (Pop-up , front-End)
            
            if (!isConfirmed){throw new BusinessRuleValidationException("Deletion Failed");}


            /*var auditLog = new AuditLog{        // Log de acordo com GDPR

                Action = "Delete Patient Profile",
                EntityId = patient.Id.AsGuid().ToString,
                EntityName = "Patient",
                Timestamp = DateTime.UtcNow,       // Buissnes Rule Defined , Time Frame Predifined.
                Details = $"Perfil do paciente com ID {patient.Id} excluído permanentemente."
            };
            */    // log for future implementation 

/*
            await _auditLogRepository.AddAsync(auditLog);
            await _patientRepository.Delete(patient); // Excluir perfil paciente
            await _unitOfWork.CommitAsync();     // commit transaction
            
            return patientDto;
        }

        /*

        private bool ConfirmDeletion(){
            // Este método é apenas um placeholder. No sistema real, a confirmação deve vir do front-end.
            return true;
        }

         public async Task<List<PatientDto>> ListPatiensByDifferentAttributes(){

            var patients = await ListPatiensByDifferentAttributes.ListPatiensByDifferentAttributes();
            List<PatientDto> patientDto = patients.ConvertAll(patient => new PatientDto{
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
        */
        

    }
}

    



