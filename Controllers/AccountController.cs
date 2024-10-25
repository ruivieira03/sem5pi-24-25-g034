using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Auth0.AspNetCore.Authentication;
using System.Threading.Tasks;
using System;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.Cookies;
using MySql.Data.MySqlClient;
using Hospital.Domain.Users.SystemUser;
using Hospital.Services;
using Hospital.ViewModels;

/**
 * AccountController
 * 
 * This controller handles authentication-related actions such as login, profile retrieval, and logout.
 * It uses Auth0 for user authentication and ensures that the user is correctly authenticated before accessing 
 * protected endpoints like viewing the profile and logging out.
 * 
 * Key Features:
 * - **Login**: Redirects the user to Auth0 for authentication.
 * - **Profile**: Returns the authenticated user's profile details, including roles.
 * - **Logout**: Logs out the user and redirects them to the specified return URL.
 * 
 * **Roles and Authorization:**
 * - Possible roles: "admin", "doctor", "nurse", "patient", "technician"
 * - To protect routes, use the `[Authorize]` attribute for any action that requires an authenticated user.
 *   You can specify roles like this: `[Authorize(Roles = "admin")]`.
 * 
 * **User Secrets:**
 * - Ensure that sensitive configuration settings, such as Auth0 domain and client ID, are stored securely using 
 *   user secrets in development. Refer to `README.md` for detailed instructions on how to set up user secrets.
 */
[ApiController]
[AllowAnonymous]
[Route("api/[controller]")]
public class AccountController : Controller
{
    private readonly ISystemUserRepository _systemUserRepository;

    private readonly IEmailService _emailService;
    private readonly IPasswordService _passwordService;

    public AccountController(ISystemUserRepository systemUserRepository, IEmailService emailService, IPasswordService passwordService)
    {
        _systemUserRepository = systemUserRepository;
        _emailService = emailService;
        _passwordService = passwordService;
    }


    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<IActionResult> Login([FromBody] LoginRequest request, string returnUrl = "/home")
    {
        var user = await _systemUserRepository.GetUserByUsernameAsync(request.Username);

        if (user == null)
        {
            return Unauthorized("Invalid username.");
        }

        // #TODO: Here it should also verify the password
        // For now, using without it
        // if (!VerifyPassword(request.Password, user.Password)) // Implement password verification

        // Create claims for the user
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, user.Username),
            new Claim(ClaimTypes.Role, user.Role.ToString()), // Role is an enum
        };

        var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
        var claimsPrincipal = new ClaimsPrincipal(claimsIdentity);

        // Sign in the user
        await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, claimsPrincipal);

        return LocalRedirect(returnUrl);
    }

    /**
     * Profile
     * 
     * Returns the authenticated user's profile information, including their name, email, roles, and profile image.
     * 
     * @returns An object containing user details such as Name, Email, Roles, and ProfileImage.
     * 
     * This endpoint is protected by the `[Authorize]` attribute, ensuring that only authenticated users can access it.
     */
    [Authorize]
    [HttpGet("profile")]
    public IActionResult Profile()
    {
        return Ok(new
        {
            Name = User.Identity.Name,
            Email = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value,
            Roles = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value,
            ProfileImage = User.Claims.FirstOrDefault(c => c.Type == "picture")?.Value  
        });
    }

    /**
     * Logout
     * 
     * Logs the user out by signing them out of both Auth0 and the local cookie authentication scheme.
     * 
     * @param returnUrl The URL where the user should be redirected after a successful logout. Defaults to "/home".
     * @returns A task that performs the sign-out operations.
     * 
     * Ensure the **Allowed Logout URLs** in Auth0 settings include the return URL.
     */
    [Authorize]
    [HttpGet("logout")]
    public async Task Logout(string returnUrl = "/home")
    {
        var authenticationProperties = new LogoutAuthenticationPropertiesBuilder()
            .WithRedirectUri(returnUrl)
            .Build();

        await HttpContext.SignOutAsync(Auth0Constants.AuthenticationScheme, authenticationProperties);
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
    }

    [HttpGet("setup-password")]
    [AllowAnonymous]
    public async Task<IActionResult> ValidateToken(string email, string token)
    {
        // Logic to validate the token
        // Checking if the token is valid for the given email

        bool isValid = await _passwordService.ValidateTokenForUser(email, token);

        if (!isValid)
        {
            return BadRequest(new { message = "Invalid token." });
        }

        return Ok(new { message = "Token is valid." });
    }

    [HttpPost("setup-password")]
    [AllowAnonymous]
    public async Task<IActionResult> SetNewPassword([FromBody] PasswordResetModel model)
    {
        // Logic to set the new password
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var user = await _systemUserRepository.GetUserByEmailAsync(model.Email);
        if (user == null)
        {
            return NotFound(new { message = "User not found." });
        }

        // Hash and set the new password
        string hashedPassword = _passwordService.HashPassword(model.Password);
        user.Password = hashedPassword;

        // Clear the reset token and expiry after password has been reset
        user.ResetToken = "";
        user.TokenExpiry = null;

        await _systemUserRepository.UpdateUserAsync(user); // Ensure you have this method implemented

        return Ok(new { message = "Password has been set successfully." });
    }

}
