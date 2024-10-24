using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;
using Hospital.Domain.Users;
using Hospital.ViewModels;

[ApiController]
[Route("api/[controller]")]
public class AdminController : ControllerBase
{
    private readonly SystemUserService _systemUserService;

    public AdminController(SystemUserService systemUserService)
    {
        _systemUserService = systemUserService;
    }

    // POST api/Admin/register
    [Authorize(Roles = "Admin")]
    [HttpPost("register")]
    public async Task<IActionResult> RegisterUser([FromBody] RegisterUserViewModel model)
    {
        // Check if the model state is valid
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            // Delegate the user registration logic to the service layer
            var newUserDto = await _systemUserService.RegisterUserAsync(model);

            // Return a Created response with the new user's details
            return CreatedAtAction(nameof(RegisterUser), new { id = newUserDto.Id }, newUserDto);
        }
        catch (Exception ex)
        {
            // Handle any exceptions (e.g., user creation failure) and return an error response
            return BadRequest(new { message = ex.Message });
        }
    }
}
