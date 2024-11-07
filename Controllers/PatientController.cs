using Microsoft.AspNetCore.Mvc;
using Hospital.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Hospital.Domain.Users.SystemUser;
using Hospital.Domain.Patients;

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
         public async Task<IActionResult> RegisterPatientProfile([FromBody] RegisterPatientProfileViewModel model){

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
                return BadRequest(new { message = ex.Message, innerException = ex.InnerException?.Message });// 
            }

        }

  



        

        // PUT: api/Patient/5/update-profile Update the patient's profile details
        [HttpPut("{id}/update-profile")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateProfile(Guid id, UpdatePatientProfileViewModel model){
            
            if (!ModelState.IsValid){
                return BadRequest(ModelState);
            }

             if (id != new PatientId(model.PatientId).AsGuid()){
                return BadRequest();                                        // Return 400 if ID in the route doesn't match the current user's ID
            }

            try {

                var updatedPatient = await _patientService.UpdateProfileAsync(model, id); // Delegate the update logic to the service layer
                return Ok(updatedPatient);              // Return OK with the updated user

            }catch (Exception ex){
                return BadRequest(new { message = ex.Message, innerException = ex.InnerException?.Message });
            }
        }


              
 // DELETE: api/Patient/5/Delete-Profilea 
    [HttpDelete("{id}/Delete-Profile")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<SystemUserDto>> DeletePatientProfile(Guid id){

        try{
           var patient =  await _patientService.DeleteAsync(new PatientId(id));



            if (patient == null){
                return NotFound(); // Return 404 if user not found
            }

            return Ok(patient); // Return OK with the deleted user's details
        }catch (Exception ex){
            return BadRequest(new { Message = ex.Message }); // Return 400 if any business rule fails
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

