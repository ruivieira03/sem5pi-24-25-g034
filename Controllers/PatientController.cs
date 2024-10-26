using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Hospital.Domain.Patient;
using Hospital.ViewModels;
using Microsoft.AspNetCore.Authorization;

namespace Hospital.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PatientController : ControllerBase
    {
        private readonly PatientRegistrationService _patientRegistrationService;

        public PatientController(PatientRegistrationService patientRegistrationService)
        {
            _patientRegistrationService = patientRegistrationService;
        }

        // POST api/patient/register
        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult> RegisterPatient([FromBody] PatientRegistrationViewModel model)
        {
            // Check if the model state is valid
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                // Delegate the registration logic to the service layer
                var newUserDto = await _patientRegistrationService.RegisterPatientAsync(model);

                // Return a Created response with the new patient's details
                return CreatedAtAction(nameof(RegisterPatient), new { id = newUserDto.Id }, newUserDto);
            }
            catch (Exception ex)
            {
                // Handle any exceptions (e.g., registration failure) and return an error response
                return BadRequest(new { message = ex.Message });
            }
        }

        /* Missing Additional endpoints for patient actions can be added here, e.g., GetById, Update, etc.
        * Patients cannot list their appointments without completing the registration process:
        * To verify this, we use the isVerified property in the SystemUser entity.
        */
    }
}
