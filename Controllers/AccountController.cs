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
using Hospital.Domain.Patients;

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

    private readonly IPasswordService _passwordService;
    private readonly SystemUserService _systemUserService;
    private readonly PatientService _patientService;

    public AccountController(ISystemUserRepository systemUserRepository, IPasswordService passwordService, SystemUserService systemUserService, PatientService patientService)
    {
        _systemUserRepository = systemUserRepository;
        _passwordService = passwordService;
        _systemUserService = systemUserService;
        _patientService = patientService;
    }


    [HttpPost("login")]   //login
    [AllowAnonymous]
    public async Task<IActionResult> Login([FromBody] LoginRequestViewModel request, string returnUrl = "/home")
    {
        var user = await _systemUserRepository.GetUserByUsernameAsync(request.Username);

        if (user == null)
        {
            return Unauthorized("Invalid username.");
        }

        string hashedPassword = _passwordService.HashPassword(request.Password);

        if (!user.AuthenticateWithoutIAM(request.Username, hashedPassword))
            return Unauthorized("Invalid combination of username and password.");

        // Create claims for the user
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, user.Username),
            new Claim(ClaimTypes.Role, user.Role.ToString()), // Role is an enum
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.NameIdentifier, user.Id.Value.ToString())
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
    public IActionResult Profile(){
        return Ok(new{
            Email = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value,
            Roles = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value,
            userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value
            
        });
    }

    /**
     * Logout
     * 
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

    /**
    * GET: api/account/setup-password
    * This endpoint is used to validate the token sent to the user's email after registration.
    * It requires the user's email and the token.
    * Only used to check if the token is valid.
    */

    [HttpGet("setup-password")]
    [AllowAnonymous]
    public async Task<IActionResult> ValidateToken()
    {

        // Extract email and token from the request's query string
        string email = Request.Query["email"].ToString();
        string token = Request.Query["token"].ToString();

        bool isValid = await _systemUserService.ValidateTokenForUser(email, token);

        if (!isValid)
        {
            return BadRequest(new { message = "Invalid token." });
        }

        return Ok(new { message = "Token is valid." });
    }

    /** POST: api/account/request-password-reset
    * This endpoint is used to set a new password for the user after they have registered.
    * It requires the user's email and the new password.
    */

    [HttpPost("request-password-reset")]
    [AllowAnonymous]
    public async Task<IActionResult> RequestPasswordReset([FromBody] PasswordResetRequestViewModel model)
    {
        try
        {
            await _systemUserService.RequestPasswordResetAsync(model.Email);
            return Ok(new { Message = "Password reset link has been sent to your email." });
        }
        catch (Exception ex)
        {
            return BadRequest(new { Message = ex.Message });
        }
    }

    /** POST: api/account/reset-password
    * This endpoint is used to reset the password for the user after they have registered.
    * It requires the user's email and the new password.
    */

    [HttpPost("reset-password")]
    [AllowAnonymous]
    public async Task<IActionResult> ResetPassword([FromBody] PasswordResetViewModel model)
    {
        string email = Request.Query["email"].ToString();

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            await _systemUserService.ResetPasswordAsync(email, model.Password);
            return Ok(new { Message = "Password has been reset successfully." });
        }
        catch (Exception ex)
        {
            return BadRequest(new { Message = ex.Message });
        }
    }

    // GET api/account/confirm-email
    [HttpGet("confirm-email")]
    [AllowAnonymous] // Allow access to this endpoint without authentication
    public async Task<IActionResult> ConfirmEmail()
    {
        // Extract email and token from the request's query string
        string email = Request.Query["email"].ToString();
        string token = Request.Query["token"].ToString();

        // Ensure that both email and token are provided
        if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(token))
        {
            return BadRequest(new { Message = "Email or token is missing." });
        }

        try
{
            // Call the service method to validate the email and token
            bool isValid = await _systemUserService.ValidateEmailTokenAsync(email, token);

            if (isValid){
                // Proceed with confirming the email

                var res = await _systemUserService.ConfirmEmailAsync(email, token);

                if (res){
                    return Ok(new { Message = "Email confirmed successfully." });
                }else{
                    return BadRequest(new { Message = "Failed to confirm the email." });
                }

            }else{
                return BadRequest(new { Message = "Invalid token or email confirmation failed." });
            }
        }
        catch (Exception ex)
        {
            return BadRequest(new { Message = "An error occurred during confirmation." });
        }
    }

    // GET api/account/request-delete-account
    [HttpGet("request-delete-account")]
    [Authorize(Roles = "Patient")] // Only patients can request account deletion
    public async Task<IActionResult> RequestDeleteAccount()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (string.IsNullOrEmpty(userId))
        {
            return Unauthorized("User ID is missing.");
        }

        try
        {
            await _systemUserService.RequestAccountDeletionAsync(new SystemUserId(userId));
            return Ok(new { Message = "A confirmation email has been sent to your registered email address." });
        }
        catch (Exception ex)
        {
            return BadRequest(new { Message = ex.Message });
        }
    }

    // GET api/account/confirm-delete-account
    [HttpGet("confirm-delete-account")]
    [AllowAnonymous] // Allow access to this endpoint without authentication

    public async Task<IActionResult> ConfirmDeleteAccount()
    {
    // Extract email and token from the request's query string
    string email = Request.Query["email"].ToString();
    string token = Request.Query["token"].ToString();

    // Ensure that both email and token are provided
    if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(token))
    {
        return BadRequest(new { Message = "Email or token is missing." });
    }

    try
    {
            // Call the service method to validate the email and token
            bool isValid = await _systemUserService.ValidateDeleteTokenAsync(email, token);

            if (isValid)
            {
                // Proceed with account deletion
                await _systemUserService.DeleteAsync(email);
                 
                return Ok(new { Message = "Account deleted successfully." });
            }
            else
            {
                return BadRequest(new { Message = "Invalid token or email confirmation failed." });
            }
        }
        catch (Exception ex)
        {
            // Log the exception
            return BadRequest(new { Message = "An error occurred during confirmation.", Details = ex.Message });
        }
    }

        // Update the patient's profile details
        // PUT: api/account/update-profile
        [HttpPut("{update-profile}")]
        [Authorize] 
        public async Task<IActionResult> UpdateProfile(UpdateProfileViewModel model)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            // Check if the model state is valid
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try{
        
                // Delegate the update logic to the service layer
                var updatedPatient = await _patientService.UpdateProfileAsUserAsync(model, new SystemUserId(userId));

                // Return OK with the updated user
                return Ok(updatedPatient);
            }
            catch (Exception ex)
            {
                // Handle any exceptions (e.g., update failure) and return an error response
                return BadRequest(new { message = ex.Message });
            }
        }


}
