using Microsoft.EntityFrameworkCore;
using Hospital.Domain.Users.SystemUser;
using Hospital.Infraestructure.Users;
using Hospital.Domain.Shared;
using Hospital.Infraestructure.Patients;
using Hospital.Domain.Patients;
using Hospital.Domain.Logs;
using Hospital.Infraestructure.Logs;
using Hospital.Services;
using System;

namespace Hospital.Infraestructure
{
    public class HospitalDbContext : DbContext
    {
        private readonly IPasswordService _passwordService;

        public DbSet<SystemUser> SystemUsers { get; set; }
        public DbSet<Patient> Patients { get; set; }
        public DbSet<AccountDeletionLog> AccountDeletionLogs { get; set; }
        public DbSet<ProfileUpdateLog> ProfileUpdateLogs { get; set; }

        // Updated constructor to accept IPasswordService
        public HospitalDbContext(DbContextOptions<HospitalDbContext> options, IPasswordService passwordService)
            : base(options)
        {
            _passwordService = passwordService ?? throw new ArgumentNullException(nameof(passwordService));
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Using an injected password service
            modelBuilder.ApplyConfiguration(new SystemUserEntityTypeConfiguration(_passwordService));

            modelBuilder.ApplyConfiguration(new PatientEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new AccountDeletionLogEntityTypeConfiguration());

            modelBuilder.ApplyConfiguration(new ProfileUpdateLogEntityTypeConfiguration());

            base.OnModelCreating(modelBuilder);
        }
    }
}
