using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Hospital.Domain.Users;
using Hospital.Services;
using Hospital.ViewModels;

[ApiController]
[Route("api/[controller]")]
public class AdminController : ControllerBase
{
    private readonly ISystemUserRepository _systemUserRepository;
    private readonly IEmailService _emailService;

    public AdminController(ISystemUserRepository systemUserRepository, IEmailService emailService)
    {
        _systemUserRepository = systemUserRepository;
        _emailService = emailService;
    }

    // POST api/Admin/register
    [HttpPost("register")]
    public async Task<IActionResult> RegisterUser([FromBody] RegisterUserViewModel model)
    {
        // Check if the model state is valid
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState); // Return validation errors
        }

        // Generate a one-time setup link or token
        string setupLink = GenerateSetupLink(model.Email);

        // Create a new SystemUser with a temporary password
        var newUser = new SystemUser(model.Username, model.Role, model.Email, model.PhoneNumber, "temporaryPassword", Guid.NewGuid().ToString());

        // Save the user to the database
        await _systemUserRepository.AddUserAsync(newUser);

        // Send a confirmation email with the setup link
        //await _emailService.SendRegistrationEmailAsync(newUser.Email, setupLink);

        // Return a Created response with the new user's details
        return CreatedAtAction(nameof(RegisterUser), new { id = newUser.Id }, newUser);
    }

    private string GenerateSetupLink(string email)
    {
        // Generate a unique token (optional, you can also use a GUID as shown previously)
        var token = Guid.NewGuid().ToString();

        // Construct the setup link using your application's base URL
        string baseUrl = "http://yourapp.com"; // Replace with your actual base URL
        string setupLink = $"{baseUrl}/setup-password?email={email}&token={token}";

        return setupLink;
    }
}
