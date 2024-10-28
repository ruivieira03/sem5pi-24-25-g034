using Hospital.Domain.Patients;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Hospital.Infraestructure;
using Hospital.Domain.Patients;

namespace Hospital.Infraestructure.Patients
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

        public async Task<List<Patient>> GetAllAsync()
        {
            return await _context.Patients.ToListAsync();
        }
    }
}
