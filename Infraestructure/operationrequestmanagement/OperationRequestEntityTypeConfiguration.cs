using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Hospital.Domain.operationrequestmanagement;
using Hospital.Domain.Users.staffmanagement;
using Hospital.Domain.Shared;

namespace Hospital.Infraestructure.operationrequestmanagement
{
    internal class OperationRequestEntityTypeConfiguration : IEntityTypeConfiguration<OperationRequest>
    {
        public void Configure(EntityTypeBuilder<OperationRequest> builder)
        {
            // Map to the "OperationRequest" table
            builder.ToTable("OperationRequest");

            // Primary key definition
            builder.HasKey(b => b.ID);

            // Configure the Id property with a value converter
            builder.Property(b => b.ID)
                .HasConversion(
                    id => id.AsGuid(), // Convert OperationRequestId to Guid
                    value => new OperationRequestId(value) // Convert Guid to OperationRequestId
                );

            // Property configurations
            builder.Property(b => b.PatientID)
                .IsRequired();

            builder.Property(b => b.DoctorID)
                .IsRequired();

            builder.Property(b => b.OperationTypeID)
                .IsRequired();

            builder.Property(b => b.DeadlineDate)
                .IsRequired();

            builder.Property(b => b.Priority)
                .IsRequired();
            
            //Seed OperationRequest data
            builder.HasData(
                new OperationRequest
                {
                    ID = new OperationRequestId(Guid.NewGuid()),
                    PatientID = Guid.NewGuid(),
                    DoctorID = new LicenseNumber(Guid.NewGuid()),
                    OperationTypeID = "1",
                    DeadlineDate = new System.DateTime(2022, 12, 31),
                    Priority = 1
                },
                new OperationRequest
                {
                    ID = new OperationRequestId(Guid.NewGuid()),
                    PatientID = Guid.NewGuid(),
                    DoctorID = new LicenseNumber(Guid.NewGuid()),
                    OperationTypeID = "2",
                    DeadlineDate = new System.DateTime(2022, 12, 31),
                    Priority = 2
                },
                new OperationRequest
                {
                    ID = new OperationRequestId(Guid.NewGuid()),
                    PatientID = Guid.NewGuid(),
                    DoctorID = new LicenseNumber(Guid.NewGuid()),
                    OperationTypeID = "3",
                    DeadlineDate = new System.DateTime(2022, 12, 31),
                    Priority = 3
                }
            );
        }
    }
}