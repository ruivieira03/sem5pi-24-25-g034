using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using Hospital.ViewModels;
using Hospital.Domain.Shared;
using Hospital.Services;

namespace Hospital.Domain.Users.SystemUser
{
    public class SystemUserService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ISystemUserRepository _systemUserRepository;
        private readonly IPasswordService _passwordService;
        private readonly IEmailService _emailService;

        public SystemUserService(IUnitOfWork unitOfWork, ISystemUserRepository systemUserRepository, IPasswordService passwordService, IEmailService emailService)
        {
            this._unitOfWork = unitOfWork;
            this._systemUserRepository = systemUserRepository;
            this._passwordService = passwordService;
            this._emailService = emailService;
        }

        public async Task<SystemUserDto> RegisterUserAsync(RegisterUserViewModel model)
        {
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

            // Verify if the username is already taken

            if (await _systemUserRepository.GetUserByUsernameAsync(newUser.Username) != null)
            {
                throw new Exception("Username already taken.");
            }

            // Generate and store the reset token
            newUser.ResetToken = Guid.NewGuid().ToString();
            newUser.TokenExpiry = DateTime.UtcNow.AddHours(24); // Token valid for 24 hours

            // Save the user to the repository
            await _systemUserRepository.AddUserAsync(newUser);

            // Generate a one-time setup link
            string setupLink = GenerateSetupLink(model.Email, newUser.ResetToken);

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
                TokenExpiry = newUser.TokenExpiry
            };
        }

        // Fetch all users
        public async Task<List<SystemUserDto>> GetAllAsync()
        {
            var users = await this._systemUserRepository.GetAllAsync();
            
            List<SystemUserDto> userDtos = users.ConvertAll(user => new SystemUserDto
            {
                Id = user.Id.AsGuid(),
                Username = user.Username,
                Role = user.Role,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                IAMId = user.IAMId,
                ResetToken = user.ResetToken,
                TokenExpiry = user.TokenExpiry
            });

            return userDtos;
        }

        // Fetch user by Id
        public async Task<SystemUserDto> GetByIdAsync(SystemUserId id)
        {
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
                TokenExpiry = user.TokenExpiry
            };
        }

        // Update user
        public async Task<SystemUserDto> UpdateAsync(SystemUserDto dto)
        {
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

            return new SystemUserDto
            {
                Id = user.Id.AsGuid(),
                Username = user.Username,
                Role = user.Role,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                IAMId = user.IAMId,
                ResetToken = user.ResetToken,
                TokenExpiry = user.TokenExpiry
            };
        }

        // Inactivate user
        public async Task<SystemUserDto> InactivateAsync(SystemUserId id)
        {
            var user = await this._systemUserRepository.GetByIdAsync(id); 

            if (user == null)
                return null;   

            // Inactivate user (mark as inactive, or adjust the field you use to signify activity)
            user.ResetToken = ""; // #TODO: inactivate user logic

            await this._unitOfWork.CommitAsync();

            return new SystemUserDto
            {
                Id = user.Id.AsGuid(),
                Username = user.Username,
                Role = user.Role,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                IAMId = user.IAMId
            };
        }

        // Delete user
        public async Task<SystemUserDto> DeleteAsync(SystemUserId id)
        {
            var user = await this._systemUserRepository.GetByIdAsync(id); 

            if (user == null)
                return null;   

            this._systemUserRepository.Remove(user);
            await this._unitOfWork.CommitAsync();

            return new SystemUserDto
            {
                Id = user.Id.AsGuid(),
                Username = user.Username,
                Role = user.Role,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                IAMId = user.IAMId
            };
        }

        private string GenerateSetupLink(string email, string token)
        {
            // Construct the setup link using your application's base URL
            string baseUrl = Environment.GetEnvironmentVariable("BASE_URL") ?? "https://localhost:5001/api/account";
            return $"{baseUrl}/setup-password?email={email}&token={token}";
        }
    
    }
}
