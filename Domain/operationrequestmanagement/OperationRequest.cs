namespace Hospital.Domain.operationrequestmanagement
{
    public class OperationRequest
    {
        public Guid ID { get; set; } // Unique identifier for the operation request
        public Guid PatientID { get; set; } // Identifier for the patient linked to this operation request
        public LicenseNumber licenseNumber { get; set; } // Identifier for the doctor who requested the operation
        public Guid OperationTypeID { get; set; } // Identifier for the type of operation to be performed
        public DateTime DeadlineDate { get; set; } // Suggested deadline date to perform the operation
        public int Priority { get; set; } // Priority level for performing the operation

        public OperationRequest() { } // Empty constructor

        public OperationRequest(Guid id, Guid patientID, LicenseNumber licenseNumber, Guid operationTypeID, DateTime deadlineDate, int priority)
        {
            ID = id;
            PatientID = patientID;
            DoctorID = licenseNumber;
            OperationTypeID = operationTypeID;
            DeadlineDate = deadlineDate;
            Priority = priority;
        }
    }
}