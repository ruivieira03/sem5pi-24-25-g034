using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using Hospital.ViewModels;
using Hospital.Domain.Shared;
using Hospital.Services;
using Hospital.Domain.Patients;
using Hospital.Domain.Users.SystemUser;

namespace Hospital.Domain.Users.SystemUser
{
    public class SystemUserService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ISystemUserRepository _systemUserRepository;
        private readonly IPasswordService _passwordService;
        private readonly IEmailService _emailService;
        private readonly IPatientRepository _patientRepository;

        public SystemUserService(IUnitOfWork unitOfWork, ISystemUserRepository systemUserRepository, IPasswordService passwordService, IEmailService emailService, IPatientRepository patientRepository)
        {
            this._unitOfWork = unitOfWork;
            this._systemUserRepository = systemUserRepository;
            this._passwordService = passwordService;
            this._emailService = emailService;
            this._patientRepository = patientRepository;
        }

        public async Task<SystemUserDto> RegisterUserAsync(RegisterUserViewModel model)
        {
            // Verify if the username is already taken

            if (await _systemUserRepository.GetUserByUsernameAsync(model.Username) != null)
            {
                throw new Exception("Username already taken.");
            }

            // Generate a temporary password
            string temporaryPassword = _passwordService.GenerateTemporaryPassword();

            // Hash the temporary password before saving it
            string hashedPassword = _passwordService.HashPassword(temporaryPassword);

            // Create a new SystemUser with the hashed password
            var newUser = new SystemUser(
                model.Username, 
                model.Role, 
                model.Email, 
                model.PhoneNumber, 
                hashedPassword, 
                Guid.NewGuid().ToString()
            );

            // Generate and store the reset token
            newUser.VerifyToken = Guid.NewGuid().ToString();
            newUser.TokenExpiry = DateTime.UtcNow.AddHours(24); // Token valid for 24 hours

            // Save the user to the repository
            await _systemUserRepository.AddUserAsync(newUser);

            // Generate a one-time setup link
            string setupLink = GenerateSetupLink(model.Email, newUser.VerifyToken);

            // Send the registration email with the setup link
            await _emailService.SendRegistrationEmailAsync(newUser.Email, setupLink);

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

        // Register a new patient user
        // This method is similar to the RegisterUserAsync method, but it also links the patient profile to the new user
        public async Task<SystemUserDto> RegisterPatientUserAsync(PatientUserViewModel model)
        {
            // Verify if the username is already taken

            if (await _systemUserRepository.GetUserByUsernameAsync(model.Username) != null)
            {
                throw new Exception("Username already taken.");
            }

            if (await _systemUserRepository.GetUserByEmailAsync(model.Email) != null)
            {
                throw new Exception("Email already taken.");
            }

            // Hash the temporary password before saving it
            string hashedPassword = _passwordService.HashPassword(model.Password);

            var patientProfile = await _patientRepository.GetPatientByEmailAsync(model.Email);

            if (patientProfile == null) 
            {
                throw new Exception("Patient profile for that email doesn't exist.");
            }

            // Create a new SystemUser with the hashed password
            var newUser = new SystemUser(
                model.Username, 
                model.Email, 
                model.PhoneNumber, 
                hashedPassword,
                patientProfile
            );

            // Generate and store the reset token
            newUser.VerifyToken = Guid.NewGuid().ToString();
            newUser.TokenExpiry = DateTime.UtcNow.AddHours(24); // Token valid for 24 hours

            // Save the user to the repository
            await _systemUserRepository.AddUserAsync(newUser);

            // Generate a one-time setup link
            string setupLink = GenerateEmailVerification(model.Email, newUser.VerifyToken);

            // Send the registration email with the setup link
            await _emailService.SendRegistrationEmailAsync(newUser.Email, setupLink);

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


        // Request password reset by generating a token and sending an email
        public async Task<SystemUserDto> RequestPasswordResetAsync(string email)
        {
            var user = await _systemUserRepository.GetUserByEmailAsync(email);
            if (user == null)
            {
                throw new Exception("User not found.");
            }

            // Generate reset token and set expiry time
            user.ResetToken = Guid.NewGuid().ToString();
            user.TokenExpiry = DateTime.UtcNow.AddHours(1); // Token valid for 1 hour

            // Generate reset link
            string resetLink = GenerateResetLink(user.Email, user.ResetToken);
            await _emailService.SendPasswordResetEmailAsync(user.Email, resetLink);

            // Commit the transaction
            await _unitOfWork.CommitAsync();

            return new SystemUserDto
            {
                Id = user.Id.AsGuid(),
                Username = user.Username,
                Role = user.Role,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                IAMId = user.IAMId,
                ResetToken = user.ResetToken,
                TokenExpiry = user.TokenExpiry,
                isVerified = user.isVerified,
                VerifyToken = user.VerifyToken
            };
        }

        // Reset password using the reset token

        public async Task<SystemUserDto> ResetPasswordAsync(string email, string newPassword){

            var user = await _systemUserRepository.GetUserByEmailAsync(email); // get User

            if (user == null){
                throw new Exception("User not found.");
            }
            
            // Check if the token is valid
            bool isValidToken = await _passwordService.ValidateTokenForUser(email, user.ResetToken);

            if (!isValidToken){
                throw new Exception("Invalid or expired reset token.");
            }

            // Hash and update the new password
            user.Password = _passwordService.HashPassword(newPassword);
            user.ResetToken = "";  // Clear reset token after use
            user.TokenExpiry = null;

            await _unitOfWork.CommitAsync();

            return new SystemUserDto{
                Id = user.Id.AsGuid(),
                Username = user.Username,
                Role = user.Role,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                IAMId = user.IAMId,
                ResetToken = user.ResetToken,
                TokenExpiry = user.TokenExpiry,
                isVerified = user.isVerified,
                VerifyToken = user.VerifyToken
            };
        }


        // Fetch all users
        public async Task<List<SystemUserDto>> GetAllAsync(){
            var users = await this._systemUserRepository.GetAllAsync();
            
            List<SystemUserDto> userDtos = users.ConvertAll(user => new SystemUserDto{
                Id = user.Id.AsGuid(),
                Username = user.Username,
                Role = user.Role,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                IAMId = user.IAMId,
                isVerified = user.isVerified
            });

            return userDtos;
        }

        // Fetch user by Id
        public async Task<SystemUserDto> GetByIdAsync(SystemUserId id){
            var user = await this._systemUserRepository.GetByIdAsync(id);
            
            if(user == null)
                return null;

            return new SystemUserDto
            {
                Id = user.Id.AsGuid(),
                Username = user.Username,
                Role = user.Role,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                IAMId = user.IAMId,
                ResetToken = user.ResetToken,
                TokenExpiry = user.TokenExpiry,
                isVerified = user.isVerified,
                VerifyToken = user.VerifyToken
            };
        }

        // Update user
        public async Task<SystemUserDto> UpdateAsync(SystemUserDto dto){
            var user = await this._systemUserRepository.GetByIdAsync(new SystemUserId(dto.Id)); 

            if (user == null)
                return null;   

            // Update user details
            user.Username = dto.Username;
            user.Role = dto.Role;
            user.Email = dto.Email;
            user.PhoneNumber = dto.PhoneNumber;
            user.IAMId = dto.IAMId;

            await this._unitOfWork.CommitAsync();

            return new SystemUserDto{
                Id = user.Id.AsGuid(),
                Username = user.Username,
                Role = user.Role,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                IAMId = user.IAMId,
                ResetToken = user.ResetToken,
                TokenExpiry = user.TokenExpiry,
                isVerified = user.isVerified,
                VerifyToken = user.VerifyToken
            };
        }

        // Inactivate user
        public async Task<SystemUserDto> InactivateAsync(SystemUserId id){
            var user = await this._systemUserRepository.GetByIdAsync(id); 

            if (user == null)
                return null;   

            // Inactivate user (mark as inactive, or adjust the field you use to signify activity)
            user.ResetToken = null; // #TODO: inactivate user logic

            await this._unitOfWork.CommitAsync();

            return new SystemUserDto{
                Id = user.Id.AsGuid(),
                Username = user.Username,
                Role = user.Role,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                IAMId = user.IAMId,
                ResetToken = user.ResetToken,
                TokenExpiry = user.TokenExpiry,
                isVerified = user.isVerified,
                VerifyToken = user.VerifyToken
            };
        }

        // Delete user
        public async Task<SystemUserDto> DeleteAsync(SystemUserId userId){
            var user = await this._systemUserRepository.GetByIdAsync(userId); 

            if (user == null)
                return null;   

            await this._systemUserRepository.Remove(user);
            await this._unitOfWork.CommitAsync();

            return new SystemUserDto{
                Id = user.Id.AsGuid(),
                Username = user.Username,
                Role = user.Role,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                IAMId = user.IAMId,
                ResetToken = user.ResetToken,
                TokenExpiry = user.TokenExpiry,
                isVerified = user.isVerified,
                VerifyToken = user.VerifyToken
            };
        }

        // Validate email token

        public async Task<bool> ValidateEmailTokenAsync(string email, string token){
            
            var user = await _systemUserRepository.GetUserByEmailAsync(email); 
        
            if (user == null)
                return false;       // Email does not exist     
            bool tokenIsValid = user.VerifyToken == token && user.TokenExpiry > DateTime.UtcNow;

            return tokenIsValid;
        }

        // Validate delete token
        public async Task<bool> ValidateDeleteTokenAsync(string email, string token){
            var user = await _systemUserRepository.GetUserByEmailAsync(email);
        
            if (user == null){
                return false; // Email does not exist
            }

            // Validate the token: Check if it matches the stored token and is not expired
            bool tokenIsValid = user.DeleteToken == token && user.TokenExpiry > DateTime.UtcNow;
            return tokenIsValid;
        }

        public async Task<bool> ConfirmEmailAsync(string email, string token){
            var user = await _systemUserRepository.GetUserByEmailAsync(email);

            if (user == null)
                return false; // User not found
            

            if (user.VerifyToken != token || user.TokenExpiry < DateTime.UtcNow){
                return false; // Invalid token or expired
            }

            user.isVerified = true; // Set email confirmation
            user.VerifyToken = null; // Clear the reset token
            user.TokenExpiry = null; // Clear the expiry date

            await _systemUserRepository.UpdateUserAsync(user); // Update the user
            await _unitOfWork.CommitAsync(); // Commit the transaction
            return true;                    // Email confirmed successfully
        }

        public async Task RequestAccountDeletionAsync(SystemUserId userId){
            // Verify if the user exists
            var user = await _systemUserRepository.GetByIdAsync(userId);
            if (user == null)
                throw new InvalidOperationException("User not found.");
            
            var token = Guid.NewGuid().ToString(); // Generate a unique token for account deletion confirmation
            user.DeleteToken = token;
                                                            // Set the token expiry time
            user.TokenExpiry = DateTime.UtcNow.AddHours(24); // Token valid for 24 hours

            // Send the account deletion confirmation email
            string deleteLink = GenerateDeleteLink(user.Email, token);
            await _emailService.SendAccountDeletionEmailAsync(user.Email, deleteLink);

            // Commit the changes
            await _unitOfWork.CommitAsync();
        }

        private string GenerateDeleteLink(string email, string token)
        {
            // Construct the delete link using application's base URL
            string baseUrl = Environment.GetEnvironmentVariable("BASE_URL") ?? "https://localhost:5001/api/account";
            return $"{baseUrl}/confirm-delete-account?email={email}&token={token}";
        }

        private string GenerateSetupLink(string email, string token)
        {
            // Construct the setup link using application's base URL
            string baseUrl = Environment.GetEnvironmentVariable("BASE_URL") ?? "https://localhost:5001/api/account";
            return $"{baseUrl}/setup-password?email={email}&token={token}";
        }

        private string GenerateResetLink(string email, string token)
        {
            // Construct the setup link using application's base URL
            string baseUrl = Environment.GetEnvironmentVariable("BASE_URL") ?? "https://localhost:5001/api/account";
            return $"{baseUrl}/reset-password?email={email}&token={token}";
        }

        private string GenerateEmailVerification(string email, string token)
        {
            // Construct the setup link using application's base URL
            string baseUrl = Environment.GetEnvironmentVariable("BASE_URL") ?? "https://localhost:5001/api/account";
            return $"{baseUrl}/confirm-email?email={email}&token={token}";
        }

        public async Task SendConfirmationEmailAsync(string email, string token)
        {
            // Construct the confirmation link
            string confirmationLink = GenerateEmailVerification(email, token);

            // Send the confirmation email
            await _emailService.SendEmailConfirmationEmailAsync(email, confirmationLink);
        }
    
    }
}
