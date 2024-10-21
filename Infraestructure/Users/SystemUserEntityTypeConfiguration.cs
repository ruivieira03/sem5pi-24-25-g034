using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Hospital.Domain.Users;

namespace Hospital.Infraestructure.Users
{
    internal class SystemUserEntityTypeConfiguration : IEntityTypeConfiguration<SystemUser>
    {
        public void Configure(EntityTypeBuilder<SystemUser> builder)
        {
            // Define the table name
            builder.ToTable("SystemUser");

            // Define the primary key
            builder.HasKey(b => b.Username); // Assuming Username is the primary key

            // Define properties and map to database columns
            builder.Property(b => b.Username)
                   .IsRequired()
                   .HasMaxLength(50); // Adjust as needed

            builder.Property(b => b.Role)
                   .IsRequired();

        
        

            // Optionally, configure the Password and IAMId
            builder.Property(b => b.Password).IsRequired(); // Adjust if needed
            builder.Property(b => b.IAMId).IsRequired(); // Adjust if needed
        }
    }
}
