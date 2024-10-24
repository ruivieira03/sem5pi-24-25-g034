using System;
using Hospital.Domain.Shared;

namespace Hospital.Domain.Users
{
    public class SystemUserDto
    {
        public Guid Id { get; set; }               // Unique identifier for the user
        public string Username { get; set; }       // Username of the user
        public Roles Role { get; set; }            // Role (Admin, Doctor, Nurse, etc.)
        public string Email { get; set; }          // Email address
        public string PhoneNumber { get; set; }    // Phone number
        public string IAMId { get; set; }          // Identity and Access Management ID

        // Optionally add properties for token info if needed
        public string ResetToken { get; set; }     // Token for password reset
        public DateTime? TokenExpiry { get; set; } // Expiry date for the reset token
    }
}
