public class UpdateProfileViewModel{
    public Guid Id { get; set; }                             // Unique identifier of the patient
    public string FirstName { get; set; }                     // First name of the patient
    public string LastName { get; set; }                      // Last name of the patient
   
   //public DateTime DateOfBirth { get; set; }                // Date of birth of the patient NOT Editable according to bussines rules
    //public string Gender { get; set; }                      // Gender of the patient Not Editable accoring to business rules.
    public string Email { get; set; }                         // Email address of the patient
    public string PhoneNumber { get; set; }                   // Phone number of the patient
    public string EmergencyContact { get; set; }              // Emergency contact information
    public List<string> AllergiesOrMedicalConditions { get; set; } // Optional allergies or medical conditions
    public List<string> AppointmentHistory { get; set; }

    /*
    public UpdateProfileViewModel(){                            // Dk why this will be needed so .
        AllergiesOrMedicalConditions = new List<string>();
    }
    */
}
