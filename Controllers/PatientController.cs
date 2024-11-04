using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Hospital.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Hospital.Services;
using Hospital.Domain.Users.SystemUser;
using Hospital.Domain.Patients;
using Hospital.Domain.Shared;

namespace Hospital.Controllers{
    [ApiController]
    [Route("api/[controller]")]
    public class PatientController : ControllerBase{
        private readonly PatientRegistrationService _patientRegistrationService;
        private readonly ISystemUserRepository _systemUserRepository;
        private readonly SystemUserService _systemUserService;
        private readonly PatientService _patientService;

        public PatientController(PatientRegistrationService patientRegistrationService, ISystemUserRepository systemUserRepository, PatientService patientService){
            _patientRegistrationService = patientRegistrationService;
            _systemUserRepository = systemUserRepository;
            _patientService = patientService;
        }

        // POST api/patient/register-profile    
        [HttpPost("register-profile")]
        [Authorize(Roles = "Admin")]
         public async Task<IActionResult> RegisterPatientProfile([FromBody] PatientProfileViewModel model){

            // Check if all ViewModel Inputs the model state is valid
            if (!ModelState.IsValid){
                return BadRequest(ModelState); // 400 
            }

            try{

                var newPatientDto = await _patientRegistrationService.RegisterPatientProfileAsync(model); // Delegate the user registration Logic to the service layer
                return CreatedAtAction(nameof(RegisterPatientProfile), new {id = newPatientDto.Id },
                 
                 new {
                    message = "Patient profile created successfully", // Sucess message
                    patient = newPatientDto                           // return message and patients
                });
            }catch (Exception ex){
                return BadRequest(new { message = ex.Message, innerException = ex.InnerException?.Message });// Displays either sucess message or
            }

        }
             
        




        
        // PUT: api/Patient/5/update-profile Update the patient's profile details
        [HttpPut("{id}/update-profile")]
        [Authorize(Roles = "Admin")] 
public async Task<IActionResult> UpdateProfile(Guid id, UpdateProfileViewModel model) {
    
    if (!ModelState.IsValid) {
        return BadRequest(ModelState);
    }

    if (id != model.Id) {
        return BadRequest(new { message = "ID in the route doesn't match the patient's ID" });
    }

    try {
        var updatedPatient = await _patientService.UpdateProfileAsync(model, id);

        // Check for changes in sensitive data and send notification
        if (model.ContainsSensitiveDataChanges()) { // Assuming a method like this exists
            await _notificationService.SendEmailAsync(updatedPatient.Email, "Profile Update Notification", "Your profile has been updated.");
        }

        // Log the update action for audit purposes
        _logger.LogInformation($"Patient profile updated by Admin {User.Identity.Name} for Patient ID: {id}");

        return Ok(new { message = "Profile updated successfully", patient = updatedPatient });
    } catch (Exception ex) {
        return BadRequest(new { message = ex.Message, innerException = ex.InnerException?.Message });
    }
}
        

        // GET: api/patient/list-patients
        [HttpGet("list-patients")] 
        [Authorize(Roles = "Admin")] 
        public async Task<ActionResult<IEnumerable<PatientDto>>> GetAll(){
            var patient = await _patientService.GetAllAsync();
            return Ok(patient); // Return OK status with the list of users
        }
   
    }


}

