using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;
using System.Linq;
using Dapper;
using MySql.Data.MySqlClient;
using System.Data;
using Hospital.Domain.Users; // Make sure to include your domain model namespace
using Microsoft.Extensions.Configuration;

[ApiController]
[Route("api/[controller]")]
public class UserRegistrationController : ControllerBase
{
    private readonly string _connectionString;

    public UserRegistrationController(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("DefaultConnection");
    }

    /**
     * RegisterUser
     * 
     * Registers a new backoffice user (doctor, nurse, technician, admin) with specified details.
     * Only accessible by admins.
     * 
     * @param username The username of the user to register.
     * @param email The email of the user to register.
     * @param phoneNumber The phone number of the user to register.
     * @param role The role of the user to register (e.g., admin, doctor, nurse, technician).
     * @param password The password for the new user.
     * @returns Success or failure message.
     */
    [Authorize(Roles = "admin")]
[HttpPost("register")]
public async Task<IActionResult> Register(string email, string role)
{
    // Validate input
    if (!Enum.TryParse<Roles>(role, true, out var parsedRole))
    {
        return BadRequest("Invalid role.");
    }

    // Add user to MySQL database
    using (IDbConnection db = new MySqlConnection(_connectionString))
    {
        var query = "INSERT INTO SystemUser (Email, Role) VALUES (@Email, @Role)";
        var parameters = new { Email = email, Role = parsedRole }; // Use parsedRole here

        try
        {
            await db.ExecuteAsync(query, parameters);
        }
        catch (MySqlException ex)
        {
            // Handle duplicate email or other database issues
            return BadRequest(ex.Message);
        }
    }

    return Ok("User registered successfully.");
}

}
