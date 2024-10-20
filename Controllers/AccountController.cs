using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Auth0.AspNetCore.Authentication;
using System.Threading.Tasks;
using System;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.Cookies;

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
[Route("api/[controller]")]
public class AccountController : Controller
{
    /**
     * Login
     * 
     * Initiates the login process by redirecting the user to the Auth0 login page.
     * 
     * @param returnUrl The URL where the user should be redirected after a successful login. Defaults to "/".
     * @returns A challenge result that initiates the authentication process.
     * 
     * Ensure the **Allowed Callback URLs** in Auth0 settings include the return URL.
     */
    [HttpGet("login")]
    [AllowAnonymous]
    public async Task Login(string returnUrl = "/home")
    {
        var authenticationProperties = new LoginAuthenticationPropertiesBuilder()
            // Indicate here where Auth0 should redirect the user after login.
            .WithRedirectUri(returnUrl)
            .Build();

        await HttpContext.ChallengeAsync(Auth0Constants.AuthenticationScheme, authenticationProperties);
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
}
