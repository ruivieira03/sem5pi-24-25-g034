using Microsoft.EntityFrameworkCore;
using Hospital.Domain.Users.SystemUser;
using Hospital.Infraestructure.Users;
using Hospital.Domain.Shared;
using Hospital.Infraestructure.Patients;
using Hospital.Domain.Patients;

namespace Hospital.Infraestructure{

    // SystemUsers seed: not using the IAMId private and not using the ContactInformation class: directly definining the Email and PhoneNumber
    public class HospitalDbContext : DbContext{
        public DbSet<SystemUser> SystemUsers { get; set; }
        public DbSet<Patient> Patients { get; set; }

        public HospitalDbContext(DbContextOptions options) : base(options){
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder){
           // Apply configurations
            modelBuilder.ApplyConfiguration(new SystemUserEntityTypeConfiguration());
            
            modelBuilder.ApplyConfiguration(new PatientEntityTypeConfiguration());

            base.OnModelCreating(modelBuilder);
        }

    }
}
