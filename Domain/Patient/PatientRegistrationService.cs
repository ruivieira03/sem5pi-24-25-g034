using System;
using System.Threading.Tasks;
using Hospital.Domain.Users.SystemUser;
using Hospital.Services;
using Hospital.ViewModels;
using Hospital.Domain.Shared;

namespace Hospital.Domain.Patient
{
    public class PatientRegistrationService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ISystemUserRepository _systemUserRepository;
        private readonly IEmailService _emailService;

        public PatientRegistrationService(IUnitOfWork unitOfWork, ISystemUserRepository systemUserRepository, IEmailService emailService)
        {
            this._unitOfWork = unitOfWork;
            this._systemUserRepository = systemUserRepository;
            this._emailService = emailService;
        }

        public async Task<SystemUserDto> RegisterPatientAsync(PatientRegistrationViewModel model)
        {
            // Validate the email
            if (await _systemUserRepository.GetUserByEmailAsync(model.Email) != null)
            {
                throw new Exception("Email already taken.");
            }

            // Verify if the username is already taken

            if (await _systemUserRepository.GetUserByUsernameAsync(model.Username) != null)
            {
                throw new Exception("Username already taken.");
            }

            // Create a new SystemUser with the hashed password
            var newUser = new SystemUser(
                model.Username, 
                model.Email,
                model.PhoneNumber
            );

            // Generate and store the reset token
            newUser.VerifyToken = Guid.NewGuid().ToString();
            newUser.TokenExpiry = DateTime.UtcNow.AddHours(24); // Token valid for 24 hours

            // Save the user to the repository
            await _systemUserRepository.AddUserAsync(newUser);

            // Generate a one-time setup link
            string setupLink = GenerateEmailVerification(model.Email, newUser.ResetToken);

            // Send the registration email with the setup link
            await _emailService.SendEmailConfirmationEmailAsync(newUser.Email, setupLink);

            // Commit the transaction
            await _unitOfWork.CommitAsync();

            // Return a DTO with the new user’s details
            return new SystemUserDto
            {
                Id = newUser.Id.AsGuid(),
                Username = newUser.Username,
                Role = newUser.Role,
                Email = newUser.Email,
                PhoneNumber = newUser.PhoneNumber,
                IAMId = newUser.IAMId,
                ResetToken = newUser.ResetToken,
                TokenExpiry = newUser.TokenExpiry,
                isVerified = newUser.isVerified,
                VerifyToken = newUser.VerifyToken
            };
        }

    private string GenerateEmailVerification(string email, string token)
        {
            // Construct the setup link using application's base URL
            string baseUrl = Environment.GetEnvironmentVariable("BASE_URL") ?? "https://localhost:5001/api/account";
            return $"{baseUrl}/confirm-email?email={email}&token={token}";
        }

    }

}
