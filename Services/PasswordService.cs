using System;
using System.Security.Cryptography;
using System.Text;
using Hospital.Domain.Users.SystemUser;

namespace Hospital.Services
{
    public class PasswordService : IPasswordService
    {
        private readonly ISystemUserRepository _systemUserRepository;

        // Injecting the ISystemUserRepository through the constructor
        public PasswordService(ISystemUserRepository systemUserRepository)
        {
            _systemUserRepository = systemUserRepository;
        }
        public string HashPassword(string password)
        {
            // Hashing the password using SHA256
            using (var sha256 = SHA256.Create())
            {
                byte[] bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                StringBuilder builder = new StringBuilder();
                for (int i = 0; i < bytes.Length; i++)
                {
                    builder.Append(bytes[i].ToString("x2"));
                }
                return builder.ToString();
            }
        }

        public bool ValidatePassword(string password, string hashedPassword)
        {
            // Hash the input password and compare it with the hashed password
            return HashPassword(password) == hashedPassword;
        }

        public string GenerateTemporaryPassword()
        {
            // Generate a temporary password (random 8-character string) 
            // #TODO: since this password is hashed, users need to know it.
            var password = Guid.NewGuid().ToString().Substring(0, 8);
            return password;
        }

        public async Task<bool> ValidateTokenForUser(string email, string token)
        {
            // Retrieve the user by email
            var user = await _systemUserRepository.GetUserByEmailAsync(email);
            if (user == null)
            {
                return false; // User not found
            }

            // Check if the token matches and is not expired
            bool isValid = user.ResetToken == token && user.TokenExpiry > DateTime.UtcNow;
            return isValid;
        }

    }
}