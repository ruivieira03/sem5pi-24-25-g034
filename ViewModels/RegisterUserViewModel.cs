using System.ComponentModel.DataAnnotations;
using Hospital.Domain.Users.SystemUser;

namespace Hospital.ViewModels
{
    public class RegisterUserViewModel
    {
        [Required(ErrorMessage = "Username is required.")]
        [MaxLength(50, ErrorMessage = "Username cannot exceed 50 characters.")]
        public string Username { get; set; }

        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Invalid email format.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Phone number is required.")]
        [Phone(ErrorMessage = "Invalid phone number format.")]
        public string PhoneNumber { get; set; }

        [Required(ErrorMessage = "Role is required.")]
        public Roles Role { get; set; }
        public string ResetToken { get; set; } // For storing the reset token
        public DateTime? TokenExpiry { get; set; } // For storing the token expiry time

    }
}
