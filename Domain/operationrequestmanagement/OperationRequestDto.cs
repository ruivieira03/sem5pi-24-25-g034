using System;
using Hospital.Domain.Shared;

namespace Hospital.Domain.operationrequestmanagement
{
    public class OperationRequestDto
    {
        public OperationRequestId ID { get; set; } // Unique identifier for the operation request
        public Guid PatientID { get; set; } // Identifier for the patient linked to this operation request
        public LicenseNumber DoctorID { get; set; } // Identifier for the doctor who requested the operation
        public string OperationTypeID { get; set; } // Identifier for the type of operation to be performed
        public DateTime DeadlineDate { get; set; } // Suggested deadline date to perform the operation
        public int Priority { get; set; } // Priority level for performing the operation
    }
}