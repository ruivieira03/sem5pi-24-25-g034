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

            if (!ModelState.IsValid)  // Baiscally check if Ui is valid
                return BadRequest(ModelState); // 500 BadRequest
            

            try{ 
                var newPatientDto = await _patientRegistrationService.RegisterPatientProfileAsync(model);                  // Delegate the user registration logic to the service layer
                return CreatedAtAction(nameof(RegisterPatientProfile), new { id = newPatientDto.Id }, newPatientDto);   // Return a Created response with the new user's details

            }catch (Exception ex){
                return BadRequest(new { message = ex.Message });            // Pops 500 error with message
            }

        }


    

        [HttpPut("{id}/update-profile")]
        [Authorize] 
        public async Task<IActionResult> UpdateProfile(Guid id, UpdateProfileViewModel model){
            
           if (!ModelState.IsValid)
                return BadRequest(ModelState);
             
            if (id != model.Id)
                return BadRequest(); 
            

            try{
                var updatedPatient = await _patientService.UpdateProfileAsync(model, id);
                return Ok(updatedPatient);

            }catch (Exception ex){
                return BadRequest(new { message = ex.Message });
            }
        }


    // GET api/patient/list-patients
        [HttpGet("list-patients")] 
        [Authorize(Roles = "Admin")] 
      
  public async Task<ActionResult<IEnumerable<PatientDto>>> GetAll(){
        var patient = await _patientService.GetAllAsync();
        return Ok(patient); // Return OK status with the list of users
       
    }


    /*

    public async Task<IActionResult> DeleteProfile(Guid id){
    
    try {
       
        var patient = await _patientService.GeStPatientByIdAsync(id);  // verifica se paciente existe
        if (patient == null){
            return NotFound(new { Message = "Paciente não encontrado" }); //  Admin selects patients Retorna 404 se o paciente não existir
        }

        // Confirmação de exclusão - este método apenas prepara para a exclusão
        
        var deletedPatient = await _patientService.DeleteProfileAsync(id);
        return Ok(new { Message = "Perfil do paciente excluído com sucesso", deletedPatient }); // Retorna sucesso e detalhes do paciente excluído

    }catch (BusinessRuleValidationException ex){ 

          return BadRequest(new { Message = ex.Message }); // Retorna 400 em caso de falha de regras de negócio}
    }
    catch (Exception ex){  
         return StatusCode(500, new { Message = "Ocorreu um erro ao excluir o perfil do paciente.", Error = ex.Message }); // Retorna 500 em caso de erro interno}
    }
    */

   

  }
}
