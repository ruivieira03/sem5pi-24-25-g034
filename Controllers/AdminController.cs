using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;
using Hospital.Domain.Users;
using Hospital.Services;
using Hospital.ViewModels;
using System;

[ApiController]
[Route("api/[controller]")]
public class AdminController : ControllerBase
{
    private readonly ISystemUserRepository _systemUserRepository;
    private readonly IEmailService _emailService;
    private readonly IPasswordService _passwordService;

    public AdminController(ISystemUserRepository systemUserRepository, IEmailService emailService, IPasswordService passwordService)
    {
        _systemUserRepository = systemUserRepository;
        _emailService = emailService;
        _passwordService = passwordService;
    }

    // POST api/Admin/register
    [Authorize(Roles = "Admin")]
    [HttpPost("register")]
    public async Task<IActionResult> RegisterUser([FromBody] RegisterUserViewModel model)
    {
        // Check if the model state is valid
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState); // Return validation errors
        }

        // Generate a temporary password (strong password requirements can be enforced here)
        string temporaryPassword = _passwordService.GenerateTemporaryPassword();

        // Hash the temporary password before saving it in the database
        string hashedPassword = _passwordService.HashPassword(temporaryPassword);

        // Create a new SystemUser with the hashed temporary password
        var newUser = new SystemUser(model.Username, model.Role, model.Email, model.PhoneNumber, hashedPassword, Guid.NewGuid().ToString());

        // Generate and store the reset token
        newUser.ResetToken = Guid.NewGuid().ToString();
        newUser.TokenExpiry = DateTime.UtcNow.AddHours(24); // Token valid for 24 hour

        // Save the user to the database
        await _systemUserRepository.AddUserAsync(newUser);

        // Generate a one-time setup link or token
        string setupLink = GenerateSetupLink(model.Email, newUser.ResetToken);

        // Send the registration email with the setup link
        await _emailService.SendRegistrationEmailAsync(newUser.Email, setupLink);

        // Return a Created response with the new user's details
        return CreatedAtAction(nameof(RegisterUser), new { id = newUser.Id }, newUser);
    }

    private string GenerateSetupLink(string email, string token)
    {
        // Construct the setup link using your application's base URL
        string baseUrl = Environment.GetEnvironmentVariable("BASE_URL") ?? "https://localhost:5001/api/account"; // Use environment variable for base URL
        string setupLink = $"{baseUrl}/setup-password?email={email}&token={token}";

        return setupLink;
    }
    
}
