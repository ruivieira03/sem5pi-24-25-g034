using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Hospital.Domain.Shared;
using Hospital.Infraestructure;

namespace Hospital.Domain.Patients
{
    public class PatientService
    {
        private readonly IPatientRepository _patientRepository;
        private readonly IUnitOfWork _unitOfWork;

        public PatientService(IPatientRepository patientRepository, IUnitOfWork unitOfWork){
            _patientRepository = patientRepository;
            _unitOfWork = unitOfWork;
        }



        public async Task<PatientDto> UpdateProfileAsync(UpdateProfileViewModel model, Guid patientId)
        {
            if (model == null)
            {
                throw new ArgumentNullException(nameof(model));
            }

            var existingPatient = await _patientRepository.GetByIdAsync(new PatientId(patientId));
            if (existingPatient == null)
            {
                throw new InvalidOperationException("Patient not found.");
            }

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


       public async Task<List<PatientDto>> GetAllAsync()
{
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


        public async Task DeleteAsync(PatientId patientId)
        {
            var existingPatient = await _patientRepository.GetByIdAsync(patientId);
            if (existingPatient == null)
            {
                throw new InvalidOperationException("Patient not found.");
            }

            await _patientRepository.Remove(existingPatient);
            await _unitOfWork.CommitAsync();
    
        }
    }
}
    
