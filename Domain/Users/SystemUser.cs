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

    public class SystemUser : Entity<SystemUserId>, IAggregateRoot
    {
        // Public properties for EF Core to bind to
        public string Username { get; set; }       // Username of the user
        public Roles Role { get; set; }            // Role (Admin, Doctor, Nurse, etc.)
        public string Email { get; set; }          // Email address (embedded from ContactInformation)
        public string PhoneNumber { get; set; }    // Phone number (embedded from ContactInformation)
        public string Password { get; set; }        // Password of the user
        public string IAMId { get; set; }          // Unique ID linked to IAM (Identity and Access Management)

        // Parameterless constructor for EF Core
        public SystemUser() 
        {
            Id = new SystemUserId(Guid.NewGuid()); // Initialize Id here if needed
        }

        // Constructor for admin-registered users (backoffice staff)
        public SystemUser(string username, Roles role, string email, string phoneNumber, string password, string iamId)
        {
            Id = new SystemUserId(Guid.NewGuid());
            Username = username;
            Role = role;
            Email = email;            // Set Email from the constructor
            PhoneNumber = phoneNumber; // Set PhoneNumber from the constructor
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
            Id = new SystemUserId(Guid.NewGuid());
            Username = username;
            Role = Roles.Patient;  // Default to Patient for self-registered users
            Email = email;         // Set Email
            PhoneNumber = phoneNumber; // Set PhoneNumber
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
