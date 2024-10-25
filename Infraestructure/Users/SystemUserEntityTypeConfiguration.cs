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
        }
    }
}
