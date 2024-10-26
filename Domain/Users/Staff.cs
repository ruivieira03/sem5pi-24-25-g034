namespace Hospital.Domain.Users
{

    public class Staff : Entity<LicenseNumber>, IAggregateRoot
    {
        public LicenseNumber LicenseNumber { get; set; } // License number of the staff
        public string Name { get; set; } // Full name of the staff
        public string Specialization { get; set; } // Specialization of the staff
        public List<string> Slots { get; set; } //to be saved like "2024-09-25:19h00/2024-09-26:02h00"
        public SystemUser SystemUser { get; set; }  // SystemUser linked to the staff
    }

    

}
