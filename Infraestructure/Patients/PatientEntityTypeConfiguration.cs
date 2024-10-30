using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Hospital.Domain.Patients;
using Hospital.Domain.Users.SystemUser;

namespace Hospital.Infraestructure.Patients{
    public class PatientEntityTypeConfiguration : IEntityTypeConfiguration<Patient>{
        public void Configure(EntityTypeBuilder<Patient> builder){

            builder.ToTable("Patients"); // Table name

            builder.HasKey(p => p.Id); // Primary key

            // Configure the Id property with a value converter
            builder.Property(b => b.Id)
                            .HasConversion(
                            id => id.AsGuid(),             // Convert SystemUserId to Guid
                            value => new PatientId(value) // Convert Guid to SystemUserId
            );

            // Properties configuration
            builder.Property(p => p.FirstName)
                .IsRequired()
                .HasMaxLength(50);

            builder.Property(p => p.LastName)
                .IsRequired()
                .HasMaxLength(50);

            builder.Property(p => p.DateOfBirth)
                .IsRequired();

            builder.Property(p => p.Gender)
                .IsRequired();

            builder.Property(p => p.MedicalRecordNumber)
                .IsRequired()
                .HasMaxLength(20);

            builder.Property(p => p.Email)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(p => p.PhoneNumber)
                .IsRequired()
                .HasMaxLength(15);

            builder.Property(p => p.AllergiesOrMedicalConditions)
                .HasMaxLength(500)
                .IsRequired(false); // Optional

            builder.Property(p => p.AppointmentHistory)
                .HasMaxLength(500)
                .IsRequired(false); // Optional

            builder.Property(p => p.EmergencyContact)
                .HasMaxLength(100)
                .IsRequired();

            //ohter Buissnes rules:
            builder.HasIndex(p => new { p.Email, p.PhoneNumber })
                .IsUnique(); // Ensure email and phone number are unique together
                            // Bussines rules here? hm...
            
             // Seed data // Bootstrap here ?
            builder.HasData(
                new Patient{
                    Id = new PatientId(Guid.NewGuid()),
                    FirstName = "Bernardo",
                    LastName = "Giao",
                    DateOfBirth = new DateTime(1985, 5, 21),
                    Gender = "Male",
                    Email = "1220741@isep.ipp.pt",
                    PhoneNumber = "1234567890",
                    EmergencyContact = "0987654321",
                    AppointmentHistory = new List<string> { "Checkup on 2024-01-20" },
                    AllergiesOrMedicalConditions = new List<string> { "Penicillin allergy" },
                    MedicalRecordNumber = "1"
                },
                new Patient
                {
                    Id = new PatientId(Guid.NewGuid()),
                    FirstName = "Rui",
                    LastName = "Vieira",
                    DateOfBirth = new DateTime(1999, 10, 10),
                    Gender = "Male",
                    Email = "ruimdvieir@gmail.com",
                    PhoneNumber = "1234567891",
                    EmergencyContact = "0987654322",
                    AppointmentHistory = new List<string> { "Vaccination on 2023-05-15" },
                    AllergiesOrMedicalConditions = new List<string> { "Nut allergy" },
                    MedicalRecordNumber = "2"
                }
            );
            
        }
    }
}
