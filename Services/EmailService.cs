using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace Hospital.Services
{
    public class EmailService : IEmailService
    {
        public async Task SendRegistrationEmailAsync(string email, string setupLink)
        {
            // SMTP configuration details
            string smtpHost = "smtp-mail.outlook.com"; 
            string smtpEmail = "1211252@isep.ipp.pt"; 
            string smtpPassword = "F0813rmdv2003"; 
            int smtpPort = 587; 

            using (var message = new MailMessage())
            {
                message.To.Add(email);
                message.Subject = "Set Up Your Account";
                message.Body = $"Welcome to the platform! Please click the following link to set your password: {setupLink}";
                message.From = new MailAddress(smtpEmail);  

                using (var client = new SmtpClient(smtpHost,smtpPort))
                {
                    client.Credentials = new NetworkCredential(smtpEmail, smtpPassword); 
                    client.EnableSsl = true;  

                    await client.SendMailAsync(message);
                }
            }
        }
    }
}
