using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Hospital.Domain.Users.SystemUser;
using Hospital.Domain.Shared;

namespace Hospital.Infraestructure.Users
{
       internal class SystemUserEntityTypeConfiguration : IEntityTypeConfiguration<SystemUser>{
              public void Configure(EntityTypeBuilder<SystemUser> builder){
                     builder.ToTable("SystemUser");  // Create Table definition

            
                     builder.HasKey(b => b.Id);  // Primary key definition

                    
                     builder.Property(b => b.Id)  // Configure the Id property with a value converter
                            .HasConversion(
                            id => id.AsGuid(),                 // Convert SystemUserId to Guid
                            value => new SystemUserId(value) // Convert Guid to SystemUserId
                     );

                   
                     builder.HasOne(b => b.Patient)    // Foreign key configuration for one-to-one relationship
                            .WithOne(u => u.SystemUser)
                            .HasForeignKey<SystemUser>(b => b.PatientId);

                     builder.Property(b => b.PatientId)
                            .IsRequired(false);   

                     builder.Property(b => b.Username)   // atributes definition
                            .IsRequired()
                            .HasMaxLength(50);

                     builder.Property(b => b.Role)
                            .IsRequired();

                     builder.Property(b => b.Password)
                            .IsRequired();

                     builder.Property(b => b.IAMId)
                            .IsRequired();

                     builder.Property(b => b.Email)
                            .IsRequired();
                     
                     builder.Property(b => b.PhoneNumber)
                            .IsRequired();

                     builder.Property(b => b.ResetToken)
                            .IsRequired(false);

                     builder.Property(b => b.VerifyToken)
                            .IsRequired(false);
                     
                     builder.Property(b => b.TokenExpiry)
                            .IsRequired(false);

                     builder.Property(b => b.isVerified)
                            .IsRequired();
                     
                     builder.Property(b => b.DeleteToken)
                            .IsRequired(false);

                     // Seed SystemUser data
                     builder.HasData(
                            new SystemUser{
                            Id = new SystemUserId(Guid.NewGuid()),
                            Username = "adminUser",
                            Role = Roles.Admin,
                            Password = "SEM5pi1234@", // Consider hashing in a real app
                            IAMId = "1",
                            Email = "ruimdv13@gmail.com",
                            PhoneNumber = "912028969",
                            isVerified = true
                     },
                            new SystemUser{
                            Id = new SystemUserId(Guid.NewGuid()),
                            Username = "doctorUser",
                            Role = Roles.Doctor,
                            Password = "SEM5pi1234@", // Consider hashing in a real app
                            IAMId = "2",
                            Email = "doctor@hospital.com",
                            PhoneNumber = "1234567891",
                            isVerified = true
                     },
                            new SystemUser
                            {
                            Id = new SystemUserId(Guid.NewGuid()),
                            Username = "nurseUser",
                            Role = Roles.Nurse,
                            Password = "SEM5pi1234@", // Consider hashing in a real app
                            IAMId = "3",
                            Email = "nurse@hospital.com",
                            PhoneNumber = "1234567892",
                            isVerified = true
                     }
              );
        }
    }
}
