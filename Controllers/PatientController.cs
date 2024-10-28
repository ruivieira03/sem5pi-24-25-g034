using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Hospital.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Hospital.Services;
using Hospital.Domain.Users.SystemUser;
using Hospital.Domain.Patients;
using Hospital.Domain.Shared;

namespace Hospital.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PatientController : ControllerBase
    {
        private readonly PatientRegistrationService _patientRegistrationService;
        private readonly ISystemUserRepository _systemUserRepository;
        private readonly SystemUserService _systemUserService;
        private readonly PatientService _patientService;

        public PatientController(PatientRegistrationService patientRegistrationService, ISystemUserRepository systemUserRepository, PatientService patientService)
        {
            _patientRegistrationService = patientRegistrationService;
            _systemUserRepository = systemUserRepository;
            _patientService = patientService;
        }

        // POST api/patient/register-profile
        [HttpPost("register-profile")]
        [Authorize(Roles = "Admin")]
         public async Task<IActionResult> RegisterPatientProfile([FromBody] PatientProfileViewModel model)
        {

            // Check if the model state is valid
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                // Delegate the user registration logic to the service layer
                var newPatientDto = await _patientRegistrationService.RegisterPatientProfileAsync(model);

                // Return a Created response with the new user's details
                return CreatedAtAction(nameof(RegisterPatientProfile), new { id = newPatientDto.Id }, newPatientDto);
            }
            catch (Exception ex)
            {
                // Handle any exceptions (e.g., user creation failure) and return an error response
                return BadRequest(new { message = ex.Message });
            }
        }
             // Get api/patient/list-patients
 
        [HttpGet("list-patients")] // get list-patients
        [Authorize(Roles = "Admin")] // for now admin , future add staff  
      
  public async Task<ActionResult<IEnumerable<PatientDto>>> GetAll(){
        var patient = await _patientService.GetAllAsync();
        return Ok(patient); // Return OK status with the list of users
       
    }
      




        /* Missing Additional endpoints for patient actions can be added here, e.g., GetById, Update, etc.
        * Patients cannot list their appointments without completing the registration process:
        * To verify this, we use the isVerified property in the SystemUser entity.
        */

        // Update the patient's profile details
        // PUT: api/Patient/5/update-profile
        [HttpPut("{id}/update-profile")]
        [Authorize] 
        public async Task<IActionResult> UpdateProfile(Guid id, UpdateProfileViewModel model)
        {
            // Check if the model state is valid
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Check if the user ID in the route matches the current user's ID
            if (id != model.Id)
            {
                return BadRequest(); // Return 400 if ID in the route doesn't match the current user's ID
            }

            try
            {
                // Delegate the update logic to the service layer
                var updatedPatient = await _patientService.UpdateProfileAsync(model, id);

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

/*
    // DELETE: api/Patient/5/delete-profile
[HttpDelete("{id}/delete-profile")]
[Authorize(Roles = "Admin")] // apenas Admin pode deletar
public async Task<IActionResult> DeleteProfile(Guid id)
{
    try
    {
        // Verifica se o paciente existe
        var patient = await _patientService.GetPatientByIdAsync(id);
        if (patient == null)
        {
            // Retorna 404 se o paciente não existir
            return NotFound(new { Message = "Paciente não encontrado" });
        }

        // Executa a exclusão
        var deletedPatient = await _patientService.DeleteProfileAsync(id);
        
        // Retorna sucesso com a mensagem e o paciente excluído
        return Ok(new { Message = "Perfil do paciente excluído com sucesso", deletedPatient });
    }
    catch (BusinessRuleValidationException ex)
    {
        // Retorna 400 em caso de falha de regras de negócio
        return BadRequest(new { Message = ex.Message });
    }
    catch (Exception ex)
    {
        // Retorna 500 em caso de erro interno
        return StatusCode(500, new { Message = "Ocorreu um erro ao excluir o perfil do paciente.", Error = ex.Message });
    }
}
    

/*
    [HttpGet("list-patients-by-attributes")]
[Authorize(Roles = "Admin")] // para agora apenas Admin, futuro pode incluir Staff
public async Task<ActionResult<PaginatedList<PatientDto>>> ListPatients(
    [FromQuery] string name = null,             // search Criteria here
    [FromQuery] string email = null,
    [FromQuery] DateTime? dateOfBirth = null,
    [FromQuery] string medicalRecordNumber = null,
    [FromQuery] int pageNumber = 1,   // INICIAL RESULTS
    [FromQuery] int pageSize = 10)
{
   
    var criteria = new PatientSearchCriteria  // search Criteria
    {
        Name = name,
        Email = email,
        DateOfBirth = dateOfBirth,
        MedicalRecordNumber = medicalRecordNumber
    };

    // Chama o serviço para buscar os pacientes com base nos critérios
    var patients = await _patientService.ListPatientsByAttributesAsync(criteria, pageNumber, pageSize);

    return Ok(patients); // Retorna status OK com a lista paginada de pacientes
}

*/


}

