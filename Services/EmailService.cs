using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace Hospital.Services{
    public class EmailService : IEmailService{

        // SMTP configuration details
            string smtpHost = "smtp-mail.outlook.com"; 
            string smtpEmail = "1211252@isep.ipp.pt"; 
            string smtpPassword = "F0813rmdv2003"; 
            int smtpPort = 587; 

        public async Task SendRegistrationEmailAsync(string email, string setupLink){

            using (var message = new MailMessage()){
                message.To.Add(email);
                message.Subject = "Set Up Your Account";
                message.Body = $"Welcome to the platform! Please click the following link to set your password: {setupLink}";
                message.From = new MailAddress(smtpEmail);  

                using (var client = new SmtpClient(smtpHost,smtpPort)){
                    client.Credentials = new NetworkCredential(smtpEmail, smtpPassword); 
                    client.EnableSsl = true;  

                    await client.SendMailAsync(message);
                }
            }
        }

        public async Task SendPasswordResetEmailAsync(string email, string setupLink){
            
            using (var message = new MailMessage()){
                message.To.Add(email);
                message.Subject = "Reset Your Password";
                message.Body = $"You have requested to reset your password. Please click the following link to reset your password: {setupLink}";
                message.From = new MailAddress(smtpEmail);  

                using (var client = new SmtpClient(smtpHost,smtpPort)){
                    client.Credentials = new NetworkCredential(smtpEmail, smtpPassword); 
                    client.EnableSsl = true;  

                    await client.SendMailAsync(message);
                }
            }
        }

        public async Task SendEmailConfirmationEmailAsync(string email, string setupLink){
            
            using (var message = new MailMessage()){
                message.To.Add(email);
                message.Subject = "Confirm Your Email";
                message.Body = $"Please click the following link to confirm your email: {setupLink}";
                message.From = new MailAddress(smtpEmail);  

                using (var client = new SmtpClient(smtpHost,smtpPort)){
                    client.Credentials = new NetworkCredential(smtpEmail, smtpPassword); 
                    client.EnableSsl = true;  

                    await client.SendMailAsync(message);
                }
            }
        }

        public async Task SendAccountDeletionEmailAsync(string email, string deleteLink){
            
            using (var message = new MailMessage()){
                message.To.Add(email);
                message.Subject = "Confirm Account Deletion";
                message.Body = $"You have requested to delete your account. Please click the following link to confirm the deletion: {deleteLink}";
                message.From = new MailAddress(smtpEmail);

                using (var client = new SmtpClient(smtpHost, smtpPort)){
                    client.Credentials = new NetworkCredential(smtpEmail, smtpPassword);
                    client.EnableSsl = true;

                    await client.SendMailAsync(message);
                }
            }
        }
        
    }
}
