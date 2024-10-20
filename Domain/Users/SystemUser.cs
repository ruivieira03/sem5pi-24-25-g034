using System;
using Hospital.Domain.Shared;

namespace Hospital.Domain.Users
{
    // Enum to represent different user roles in the system
    public enum Roles
    {
        Admin,
        Doctor,
        Nurse,
        Technician,
        Patient
    }

    // Base class representing a system user
    public class SystemUser
    {
        public string Username { get; set; }       // Username of the user
        public Roles Role { get; set; }            // Role (Admin, Doctor, Nurse, etc.)
        public ContactInformation Info { get; set; } // Contact information (Email, Phone)
        public string Password { get; set; } // Password of the user
        public string IAMId { get; private set; }  // Unique ID linked to IAM (Identity and Access Management)
        
        // Constructor for admin-registered users (backoffice staff)
        public SystemUser(string username, Roles role, string email, string phoneNumber, string password, string iamId)
        {
            Username = username;
            Role = role;
            Info = new ContactInformation(email, phoneNumber);
            Password = password;
            IAMId = iamId;

            // Backoffice users are registered by admin and must not be patients
            if (Role == Roles.Patient)
            {
                throw new InvalidOperationException("Patients must use the self-registration process.");
            }
        }

        // Constructor for self-registered patient users
        public SystemUser(string username, string email, string phoneNumber, string iamId)
        {
            Username = username;
            Role = Roles.Patient;  // Default to Patient for self-registered users
            Info = new ContactInformation(email, phoneNumber);
            Password = "patient" + phoneNumber; // Default password for self-registered users
            IAMId = iamId;
        }

        // Simulate IAM authentication (would actually integrate with an external service)
        public bool Authenticate(string username, string iamId)
        {
            return Username == username && IAMId == iamId;
        }
    }
}
