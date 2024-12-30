using Hospital.Domain.Patients;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hospital.Infrastructure.Patients
{
    public class PatientRepository : IPatientRepository
    {
        private readonly HospitalDbContext _context;

        public PatientRepository(HospitalDbContext context)
        {
            _context = context;
        }

        public async Task<Patient> GetByIdAsync(PatientId id)
        {
            return await _context.Patients
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<Patient> GetMedicalRecordNumberAsync(string medicalRecordNumber)
        {
            return await _context.Patients
                .FirstOrDefaultAsync(p => p.MedicalRecordNumber == medicalRecordNumber);
        }

        public async Task<Patient> GetPatientByEmailAsync(string email)
        {
            return await _context.Patients
                .FirstOrDefaultAsync(p => p.Email == email);
        }

        public async Task<Patient> GetPatientByPhoneNumberAsync(string phoneNumber)
        {
            return await _context.Patients
                .FirstOrDefaultAsync(p => p.PhoneNumber == phoneNumber);
        }

        public async Task<Patient> GetByFirstNameAsync(string firstName)
        {
            return await _context.Patients
                .FirstOrDefaultAsync(p => p.FirstName == firstName);
        }

        public async Task<Patient> GetByLastNameAsync(string lastName)
        {
            return await _context.Patients
                .FirstOrDefaultAsync(p => p.LastName == lastName);
        }

        public async Task<IEnumerable<Patient>> GetByAllergiesAsync(string allergy)
        {
            return await _context.Patients
                .Where(p => p.AllergiesOrMedicalConditions.Any(a => a == allergy))
                .ToListAsync();
        }

        public async Task<IEnumerable<Patient>> GetByAppointmentHistoryAsync(string appointment)
        {
            return await _context.Patients
                .Where(p => p.AppointmentHistory.Any(a => a == appointment))
                .ToListAsync();
        }

        public async Task<Patient> GetByGenderAsync(string gender)
        {
            return await _context.Patients
                .FirstOrDefaultAsync(p => p.Gender == gender);
        }

        public async Task<Patient> GetByEmergencyContactAsync(string emergencyContact)
        {
            return await _context.Patients
                .FirstOrDefaultAsync(p => p.EmergencyContact == emergencyContact);
        }

        public async Task<Patient> DateOfBirthAsync(DateTime dateOfBirth)
        {
            return await _context.Patients
                .FirstOrDefaultAsync(p => p.DateOfBirth == dateOfBirth);
        }

        public async Task AddPatientAsync(Patient patient)
        {
            await _context.Patients.AddAsync(patient);
        }

        public async Task UpdatePatientAsync(Patient patient)
        {
            _context.Patients.Update(patient);
        }

        public async Task Remove(Patient patient)
        {
            _context.Patients.Remove(patient);
        }

       public async Task RemovePersonalData(Patient patient)
{
    if (patient == null) throw new ArgumentNullException(nameof(patient));
    
    patient.FirstName = null;
    patient.LastName = null;
    patient.DateOfBirth = default; // Para DateTime, defina como valor padrão
    patient.Email = null;
    patient.PhoneNumber = null;
    patient.Gender = null;
    patient.EmergencyContact = null;
    patient.MedicalRecordNumber = null;

    // Marcar como modificado e salvar no banco
    _context.Patients.Update(patient);
    await _context.SaveChangesAsync();
}


        public async Task<List<Patient>> GetAllAsync()
        {
            return await _context.Patients.ToListAsync();
        }

        public Task<Patient> GetDateOfBirthAsync(string dateOfBirth)
        {
            throw new NotImplementedException();
        }

        Task<Patient> IPatientRepository.GetByAllergiesAsync(string allergies)
        {
            throw new NotImplementedException();
        }

        Task<Patient> IPatientRepository.GetByAppointmentHistoryAsync(string appointmentHistory)
        {
            throw new NotImplementedException();
        }

        public Task<Patient> GetByEmergencyContact(string emergencyContact)
        {
            throw new NotImplementedException();
        }
    }
}
