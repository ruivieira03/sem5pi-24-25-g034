using System.Threading.Tasks;

namespace Hospital.Services{
    public interface IEmailService{
        Task SendRegistrationEmailAsync(string email, string setupLink);
        Task SendPasswordResetEmailAsync(string email, string setupLink);
        Task SendEmailConfirmationEmailAsync(string email, string setupLink);
        Task SendAccountDeletionEmailAsync(string email, string setupLink);
    }
}
