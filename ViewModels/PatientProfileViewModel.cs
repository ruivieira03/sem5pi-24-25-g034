using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Hospital.Domain.Patients;

namespace Hospital.ViewModels
{
    public class PatientProfileViewModel
    {
        [Required(ErrorMessage = "First name is required.")]
        [MaxLength(50, ErrorMessage = "First name cannot exceed 50 characters.")]
        public string FirstName { get; set; } // Added FirstName

        [Required(ErrorMessage = "Last name is required.")]
        [MaxLength(50, ErrorMessage = "Last name cannot exceed 50 characters.")]
        public string LastName { get; set; } // Added LastName

        [Required(ErrorMessage = "Date of birth is required.")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime DateOfBirth { get; set; } // Added DateOfBirth

        [Required(ErrorMessage = "Gender is required.")]
        public string Gender { get; set; } // Added Gender

        [Required(ErrorMessage = "Medical record number is required.")]
        public string MedicalRecordNumber { get; set; } // Added MedicalRecordNumber

        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Invalid email format.")]
        public string Email { get; set; } // Existing property

        [Required(ErrorMessage = "Phone number is required.")]
        [Phone(ErrorMessage = "Invalid phone number format.")]
        public string PhoneNumber { get; set; } // Existing property

        [Required(ErrorMessage = "Emergency contact is required.")]
        public string EmergencyContact { get; set; } // Added EmergencyContact

        public List<string> AllergiesOrMedicalConditions { get; set; } = new List<string>(); // Added allergies/conditions
        public List<string> AppointmentHistory { get; set; } = new List<string>(); // Added appointment history
    }
}