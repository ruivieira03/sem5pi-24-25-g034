using System;
using System.Collections.Generic;
using Hospital.Domain.Shared;
using System.ComponentModel.DataAnnotations.Schema;
using Hospital.Domain.Users.SystemUser;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages.Manage;
using System.ComponentModel.DataAnnotations;

namespace Hospital.Domain.Patients{
    public class Patient : Entity<PatientId>{
        // Public properties for EF Core to bind to
        public string FirstName { get; set; }                        // First name of the patient
        public string LastName { get; set; }                         // Last name of the patient
       
        [NotMapped]
        public string FullName => $"{FirstName} {LastName}";        // Full name, derived from first and last name
        public DateTime DateOfBirth { get; set; }                   // Date of birth of the patient
        public String Gender { get; set; }                           // Gender of the patient
        public String MedicalRecordNumber { get; set; }             // Unique identifier for the patient's medical record
        public String Email { get; set; }                            // Email address of the patient
        public String PhoneNumber { get; set; }                      // Phone number of the patient
        public List<string>? AllergiesOrMedicalConditions { get; set; } // Optional list of allergies or medical conditions
        public String EmergencyContact { get; set; }                 // Emergency contact information
        public List<string>? AppointmentHistory { get; set; }    // List of previous and upcoming appointments
        public SystemUser? SystemUser { get; set; } // Navigation property back to SystemUser


        // Parameterless constructor for EF Core
        public Patient(){
            Id = new PatientId(Guid.NewGuid()); // Initialize Id here if needed
    
        }

        // Constructor to create a new patient with necessary details
        public Patient(string firstName, string lastName, DateTime dateOfBirth, String gender,
                       string medicalRecordNumber, String email, String phoneNumber, string emergencyContact){
            Id = new PatientId(Guid.NewGuid()); // Generate a new unique ID == guid
            FirstName = firstName;
            LastName = lastName;
            DateOfBirth = dateOfBirth;
            Gender = gender;
            MedicalRecordNumber = medicalRecordNumber; // Unique identifier
            Email = email; // Email must be unique
            PhoneNumber = phoneNumber; // Phone must be unique
            EmergencyContact = emergencyContact;

            AppointmentHistory = new List<string>();
            AllergiesOrMedicalConditions = new List<string>();
        
        }

        // Method to update patient profile details
        public void UpdateProfile(string firstName, string lastName, String email, String phoneNumber, string emergencyContact){
            FirstName = firstName;
            LastName = lastName;
            Email = email; // Email can trigger additional verification if changed
            PhoneNumber = phoneNumber; // Phone can trigger additional verification if changed
            EmergencyContact = emergencyContact;
        }
       
    }

}
