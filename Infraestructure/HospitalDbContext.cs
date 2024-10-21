using Microsoft.EntityFrameworkCore;
using Hospital.Domain.Users;
using Hospital.Infraestructure.Users;
using Hospital.Domain.Shared;

namespace Hospital.Infraestructure
{

    // SystemUsers seed: not using the IAMId private and not using the ContactInformation class: directly definining the Email and PhoneNumber
    public class HospitalDbContext : DbContext
    {
        public DbSet<SystemUser> SystemUsers { get; set; }

        public HospitalDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
           // Apply configurations
    modelBuilder.ApplyConfiguration(new SystemUserEntityTypeConfiguration());

    // Seed initial data for ContactInformation
    modelBuilder.Entity<ContactInformation>().HasData(
        new ContactInformation { Id = 1, Email = "ruimdv13@gmail.com", PhoneNumber = "912028969" },
        new ContactInformation { Id = 2, Email = "doctor@hospital.com", PhoneNumber = "1234567891" },
        new ContactInformation { Id = 3, Email = "nurse@hospital.com", PhoneNumber = "1234567892" }
    );

    // Seed SystemUser with direct reference to ContactInformation data
    modelBuilder.Entity<SystemUser>().HasData(
        new SystemUser
        {
            Username = "adminUser",
            Role = Roles.Admin,
            Password = "SEM5pi1234@",
            IAMId = "1",
            Email = "ruimdv13@gmail.com",      // Directly set the Email
            PhoneNumber = "912028969"          // Directly set the PhoneNumber
        },
        new SystemUser
        {
            Username = "adminUser1",
            Role = Roles.Admin,
            Password = "SEM5pi1234@",
            IAMId = "4",
            Email = "ruimdv03@gmail.com",      // Directly set the Email
            PhoneNumber = "912028969"          // Directly set the PhoneNumber
        },
        new SystemUser
        {
            Username = "doctorUser",
            Role = Roles.Doctor,
            Password = "SEM5pi1234@",
            IAMId = "2",
            Email = "doctor@hospital.com",     // Directly set the Email
            PhoneNumber = "1234567891"          // Directly set the PhoneNumber
        },
        new SystemUser
        {
            Username = "nurseUser",
            Role = Roles.Nurse,
            Password = "SEM5pi1234@",
            IAMId = "3",
            Email = "nurse@hospital.com",      // Directly set the Email
            PhoneNumber = "1234567892"          // Directly set the PhoneNumber
        }
    );

            base.OnModelCreating(modelBuilder);
        }

    }
}
