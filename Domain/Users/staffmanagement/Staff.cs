namespace Hospital.Domain.Users.staffmanagement
{
    // Represents a staff member in the hospital
    public class Staff : Entity<LicenseNumber>, IAggregateRoot
    {
        public LicenseNumber LicenseNumber { get; set; }          // License number of the staff
        public string Name { get; set; }                          // Full name of the staff
        public string Specialization { get; set; }                // Specialization of the staff
        public List<string> Slots { get; set; }                   // List of available slots for the staff, formatted as "YYYY-MM-DD:HHhMM/HHhMM"
        public SystemUser SystemUser { get; set; }                // SystemUser linked to the staff

        // Constructor to initialize a Staff object with required properties
        public Staff(LicenseNumber licenseNumber, string name, string specialization, SystemUser systemUser)
        {
            Id = licenseNumber;                                   // Set the unique identifier for the staff
            LicenseNumber = licenseNumber;                        // Assign the provided license number
            Name = name;                                          // Assign the provided name
            Specialization = specialization;                      // Assign the provided specialization
            Slots = new List<string>();                           // Initialize the list of slots
            SystemUser = systemUser;                              // Assign the provided SystemUser
        }

        public Staff()
        {
            //Parameterless constructor for EF Core
        }

        //Receives to dates and adds them as strings to the slots list
        public void AddSlots(DateTime start, DateTime end)
        {
            Slots.Add($"{start.ToString("yyyy-MM-dd")}:{start.ToString("HH'h'mm")}/{end.ToString("HH'h'mm")}");
        }
    }
}
