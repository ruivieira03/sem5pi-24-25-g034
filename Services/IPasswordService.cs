using System.Threading.Tasks;

namespace Hospital.Services

{
public interface IPasswordService
    {
        string HashPassword(string password);
        bool ValidatePassword(string password, string hashedPassword);
        string GenerateTemporaryPassword();
        Task<bool> ValidateTokenForUser(string email, string token);
    }
}