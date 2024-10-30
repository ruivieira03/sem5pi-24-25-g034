using Microsoft.EntityFrameworkCore;
using Hospital.Domain.Users.SystemUser;
using Hospital.Infraestructure.Users;
using Hospital.Domain.Shared;
using Hospital.Infraestructure.Patients;
using Hospital.Domain.Patients;
using Hospital.Domain.Logs;
using Hospital.Infraestructure.Logs;

namespace Hospital.Infraestructure
{

    // SystemUsers seed: not using the IAMId private and not using the ContactInformation class: directly definining the Email and PhoneNumber
    public class HospitalDbContext : DbContext
    {
        public DbSet<SystemUser> SystemUsers { get; set; }
        public DbSet<Patient> Patients { get; set; }
        public DbSet<AccountDeletionLog> AccountDeletionLogs { get; set; } 
        public DbSet<ProfileUpdateLog> ProfileUpdateLogs { get; set; } 

        public HospitalDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
           // Apply configurations
            modelBuilder.ApplyConfiguration(new SystemUserEntityTypeConfiguration());

            modelBuilder.ApplyConfiguration(new PatientEntityTypeConfiguration());

            modelBuilder.ApplyConfiguration(new AccountDeletionLogEntityTypeConfiguration());

            modelBuilder.ApplyConfiguration(new ProfileUpdateLogEntityTypeConfiguration());

            base.OnModelCreating(modelBuilder);
        }

    }
}
