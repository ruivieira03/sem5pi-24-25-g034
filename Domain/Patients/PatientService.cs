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

            // Save changes to the repository
            await _patientRepository.UpdatePatientAsync(existingPatient);
            await _unitOfWork.CommitAsync();

            return new PatientDto
            {
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

        public async Task DeleteAsync(PatientId patientId)
        {
            // Check if the patient exists
            var existingPatient = await _patientRepository.GetByIdAsync(patientId);
            if (existingPatient == null)
            {
                throw new InvalidOperationException("Patient not found.");
            }

            // Delete the patient record
            await _patientRepository.Remove(existingPatient);
            await _unitOfWork.CommitAsync();
        }

        
    }
}
