using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace Hospital.Services
{
    public class EmailService : IEmailService
    {
        private readonly string _smtpHost = "smtp.your-email-provider.com"; // Replace with your SMTP host
        private readonly string _fromEmail = "your-email@yourapp.com"; // Replace with your sender email
        private readonly string _fromPassword = "your-email-password"; // Replace with your sender email password

        public async Task SendRegistrationEmailAsync(string email, string setupLink)
        {
            using (var message = new MailMessage())
            {
                message.To.Add(email);
                message.Subject = "Setup Your Account";
                message.Body = $"Please click the following link to set your password: {setupLink}";
                message.From = new MailAddress(_fromEmail);

                using (var client = new SmtpClient(_smtpHost))
                {
                    client.Port = 587; // Use the appropriate port for your SMTP server (e.g., 587 for TLS)
                    client.Credentials = new NetworkCredential(_fromEmail, _fromPassword);
                    client.EnableSsl = true;

                    // Send the email asynchronously
                    await client.SendMailAsync(message);
                }
            }
        }
    }
}
