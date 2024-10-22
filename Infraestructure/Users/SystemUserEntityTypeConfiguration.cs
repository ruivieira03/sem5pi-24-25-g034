using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Hospital.Domain.Users;
using Hospital.Domain.Shared; // Ensure you include this for SystemUserId

namespace Hospital.Infraestructure.Users
{
    internal class SystemUserEntityTypeConfiguration : IEntityTypeConfiguration<SystemUser>
    {
        public void Configure(EntityTypeBuilder<SystemUser> builder)
        {
            // Define the table name
            builder.ToTable("SystemUser");

            // Define the primary key
            builder.HasKey(b => b.Id);

            // Define properties and map to database columns
            builder.Property(b => b.Username)
                   .IsRequired()
                   .HasMaxLength(50); // Adjust as needed

            builder.Property(b => b.Role)
                   .IsRequired();

            // Configure the Id property using a value converter
            builder.Property(b => b.Id)
                   .HasConversion(
                       id => id.AsGuid(), // Convert SystemUserId to Guid
                       value => new SystemUserId(value) // Convert Guid back to SystemUserId
                   );

            // Optionally, configure the Password and IAMId
            builder.Property(b => b.Password)
                   .IsRequired(); // Adjust if needed

            builder.Property(b => b.IAMId)
                   .IsRequired(); // Adjust if needed
        }
    }
}
