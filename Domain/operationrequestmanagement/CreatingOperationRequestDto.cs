using Hospital.Domain.Users.staffmanagement;

namespace Hospital.Domain.operationrequestmanagement
{
    public class CreatingOperationRequestDto
    {
        public Guid ID { get; set; }
        public Guid PatientID { get; set; }
        public Guid DoctorID { get; set; }
        public string OperationTypeID { get; set; }
        public DateTime DeadlineDate { get; set; }
        public int Priority { get; set; }

        public CreatingOperationRequestDto(Guid ID, Guid PatientID, Guid DoctorID, string OperationTypeID, DateTime DeadlineDate, int Priority)
        {
            this.ID = ID;
            this.PatientID = PatientID;
            this.DoctorID = DoctorID;
            this.OperationTypeID = OperationTypeID;
            this.DeadlineDate = DeadlineDate;
            this.Priority = Priority;
        }
    }
}