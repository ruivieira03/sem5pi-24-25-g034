using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;
using Hospital.Domain.Users.SystemUser;
using Hospital.ViewModels;
using Hospital.Domain.Shared;

[ApiController]
[Route("api/[controller]")]
public class SystemUserController : ControllerBase
{
    private readonly SystemUserService _systemUserService;

    public SystemUserController(SystemUserService systemUserService)
    {
        _systemUserService = systemUserService;
    }

    // POST api/SystemUser/register
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

    // GET: api/SystemUser
    [Authorize(Roles = "Admin")]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<SystemUserDto>>> GetAll()
    {
        var users = await _systemUserService.GetAllAsync();
        return Ok(users); // Return OK status with the list of users
    }

    // GET: api/SystemUser/5
    [Authorize(Roles = "Admin")]
    [HttpGet("{id}")]
    public async Task<ActionResult<SystemUserDto>> GetById(Guid id)
    {
        var user = await _systemUserService.GetByIdAsync(new SystemUserId(id));

        if (user == null)
        {
            return NotFound(); // Return 404 if user not found
        }

        return Ok(user); // Return OK status with the user data
    }


    // PUT: api/SystemUser/5
    [Authorize(Roles = "Admin")]
    [HttpPut("{id}")]
    public async Task<ActionResult<SystemUserDto>> Update(Guid id, SystemUserDto dto)
    {
        if (id != dto.Id)
        {
            return BadRequest(); // Return 400 if ID in the route doesn't match the DTO
        }

        try
        {
            var updatedUser = await _systemUserService.UpdateAsync(dto);

            if (updatedUser == null)
            {
                return NotFound(); // Return 404 if user not found
            }

            return Ok(updatedUser); // Return OK with the updated user
        }
        catch (BusinessRuleValidationException ex)
        {
            return BadRequest(new { Message = ex.Message }); // Return 400 if any business rule fails
        }
    }

    // Inactivate: api/SystemUser/5
    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<ActionResult<SystemUserDto>> SoftDelete(Guid id)
    {
        var user = await _systemUserService.InactivateAsync(new SystemUserId(id));

        if (user == null)
        {
            return NotFound(); // Return 404 if user not found
        }

        return Ok(user); // Return OK with the inactivated user's details
    }

    // DELETE: api/SystemUser/5/hard
    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}/hard")]
    public async Task<ActionResult<SystemUserDto>> HardDelete(Guid id)
    {
        try
        {
            var user = await _systemUserService.DeleteAsync(new SystemUserId(id));

            if (user == null)
            {
                return NotFound(); // Return 404 if user not found
            }

            return Ok(user); // Return OK with the deleted user's details
        }
        catch (BusinessRuleValidationException ex)
        {
            return BadRequest(new { Message = ex.Message }); // Return 400 if any business rule fails
        }
    }

}
