using System.Threading.Tasks;

namespace Hospital.Services
{
    public interface IEmailService
    {
        Task SendRegistrationEmailAsync(string email, string setupLink);
    }
}
