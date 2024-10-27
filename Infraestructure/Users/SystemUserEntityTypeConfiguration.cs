using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Hospital.Domain.Users.SystemUser;
using Hospital.Domain.Shared;

namespace Hospital.Infraestructure.Users
{
       internal class SystemUserEntityTypeConfiguration : IEntityTypeConfiguration<SystemUser>
       {
              public void Configure(EntityTypeBuilder<SystemUser> builder)
              {
                     // Map to the "SystemUser" table
                     builder.ToTable("SystemUser");

                     // Primary key definition
                     builder.HasKey(b => b.Id);

                     // Configure the Id property with a value converter
                     builder.Property(b => b.Id)
                            .HasConversion(
                            id => id.AsGuid(), // Convert SystemUserId to Guid
                            value => new SystemUserId(value) // Convert Guid to SystemUserId
                     );

                     // Property configurations
                     builder.Property(b => b.Username)
                            .IsRequired()
                            .HasMaxLength(50);

                     builder.Property(b => b.Role)
                            .IsRequired();

                     builder.Property(b => b.Password)
                            .IsRequired();

                     builder.Property(b => b.IAMId)
                            .IsRequired();

                     // Seed SystemUser data
                     builder.HasData(
                            new SystemUser
                            {
                            Id = new SystemUserId(Guid.NewGuid()),
                            Username = "adminUser",
                            Role = Roles.Admin,
                            Password = "SEM5pi1234@", // Consider hashing in a real app
                            IAMId = "1",
                            Email = "ruimdv13@gmail.com",
                            PhoneNumber = "912028969",
                            ResetToken = "",
                            VerifyToken = "",
                            TokenExpiry = null,
                            isVerified = true
                     },
                            new SystemUser
                            {
                            Id = new SystemUserId(Guid.NewGuid()),
                            Username = "doctorUser",
                            Role = Roles.Doctor,
                            Password = "SEM5pi1234@", // Consider hashing in a real app
                            IAMId = "2",
                            Email = "doctor@hospital.com",
                            PhoneNumber = "1234567891",
                            ResetToken = "",
                            VerifyToken = "",
                            TokenExpiry = null,
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
                            ResetToken = "",
                            VerifyToken = "",
                            TokenExpiry = null,
                            isVerified = true
                     }
              );
        }
    }
}
