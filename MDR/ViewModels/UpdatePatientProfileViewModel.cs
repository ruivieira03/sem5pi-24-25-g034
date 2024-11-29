using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Hospital.ViewModels{   // Al us , regarding Patient Profile Here.
    public class UpdatePatientProfileViewModel{

        [Required]
        public string Id { get; set; } // Added Id

        [MaxLength(50, ErrorMessage = "First name cannot exceed 50 characters.")]
        public string? FirstName { get; set; } // Added FirstName
   
        [MaxLength(50, ErrorMessage = "Last name cannot exceed 50 characters.")]
        public string? LastName { get; set; } // Added LastName


        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [MaxLength(0, ErrorMessage = "Date of Birth cannot be edited")]
        public DateTime DateOfBirth { get; set; } // Added DateOfBirth

       
        [MaxLength(0, ErrorMessage = "Gender cannot be edited")]
        public string? Gender { get; set; }
                
        [EmailAddress(ErrorMessage = "Invalid email format.")]  //update : Email format verified:         
        public string? Email { get; set; } 
        
        [Phone(ErrorMessage = "Invalid phone number format.")]
        public string? PhoneNumber { get; set; } // Existing property
        public string? EmergencyContact { get; set; } // Added EmergencyContact
        public List<string>? AllergiesOrMedicalConditions { get; set; } = new List<string>(); // Added allergies/conditions
        public List<string>? AppointmentHistory { get; set; } = new List<string>(); // Added appointment history
    }
}