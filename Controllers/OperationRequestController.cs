using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;
using Hospital.Domain.operationrequestmanagement;
using Hospital.ViewModels;
using Hospital.Domain.Shared;

[ApiController]
[Route("api/[controller]")]
public class OperationRequestController : ControllerBase
{
    private readonly OperationRequestService _operationRequestService;

    public OperationRequestController(OperationRequestService operationRequestService)
    {
        _operationRequestService = operationRequestService;
    }

    // POST api/OperationRequest/create
    [Authorize(Roles = "Admin, Doctor")]
    [HttpPost("create")]
    public async Task<IActionResult> CreateOperationRequest([FromBody] OperationRequestViewModel model)
    {
        // Check if the model state is valid
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            // Delegate the operation request creation logic to the service layer
            var newRequestDto = await _operationRequestService.CreateOperationRequestAsync(model);

            // Return a Created response with the new request's details
            return CreatedAtAction(nameof(CreateOperationRequest), new { id = newRequestDto.Id }, newRequestDto);
        }
        catch (Exception ex)
        {
            // Handle any exceptions (e.g., request creation failure) and return an error response
            return BadRequest(new { message = ex.Message });
        }
    }

    // GET: api/OperationRequest
    [Authorize(Roles = "Admin, Doctor")]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<OperationRequestDto>>> GetAll()
    {
        var requests = await _operationRequestService.GetAllAsync();
        return Ok(requests); // Return OK status with the list of requests
    }

    // GET: api/OperationRequest/5
    [HttpGet("{id}")]
    public async Task<ActionResult<OperationRequestDto>> GetById(Guid id)
    {
        var request = await _operationRequestService.GetByIdAsync(new OperationRequestId(id));
        return Ok(request); // Return OK status with the request details
    }

    // GET: api/OperationRequest/patient/{name}
    [Authorize(Roles = "Admin, Doctor")]
    [HttpGet("patient/{name}")]
    public async Task<ActionResult<OperationRequestDto>> GetByPatient(Guid patientId)
    {
        var request = await _operationRequestService.GetOperationRequestsByPatientAsync(patientId);
        return Ok(request); // Return OK status with the request details
    }

    // GET: api/OperationRequest/type/{operationTypeId}
    [Authorize(Roles = "Admin, Doctor")]
    [HttpGet("type/{operationTypeId}")]
    public async Task<ActionResult<OperationRequestDto>> GetByType(string operationTypeId)
    {
        var request = await _operationRequestService.GetOperationRequestsByTypeAsync(operationTypeId);
        return Ok(request); // Return OK status with the request details
    }

    // GET: api/OperationRequest/priority/{priority}
    [Authorize(Roles = "Admin, Doctor")]
    [HttpGet("priority/{priority}")]
    public async Task<ActionResult<OperationRequestDto>> GetByPriority(int priority)
    {
        var request = await _operationRequestService.GetOperationRequestsByPriorityAsync(priority);
        return Ok(request); // Return OK status with the request details
    }

    /* STATUS BELONGS TO APPOINTMENT (See 3.4 and 3.6 on the specifications document)
    // GET: api/OperationRequest/status/{status}
    [Authorize(Roles = "Admin, Doctor")]
    [HttpGet("status/{status}")]
    public async Task<ActionResult<OperationRequestDto>> GetByStatus(string status)
    {
        var request = await _operationRequestService.GetOperationRequestsByStatusAsync(status);
        return Ok(request); // Return OK status with the request details
    }
    */

    // PUT: api/OperationRequest/5
    [HttpPut("{id}")]
    [Authorize(Roles = "Admin, Doctor")]
    public async Task<ActionResult<OperationRequestDto>> Update([FromRoute] OperationRequestId id, [FromBody] OperationRequestDto dto)
    {
        if (id.AsGuid() != dto.Id)
        {
            return BadRequest(); // Return 400 if ID in the route doesn't match the DTO
        }

        try // Try to update the request
        {
            var updatedRequest = await _operationRequestService.UpdateOperationRequestAsync(dto);

            if (updatedRequest == null)
            {
                return NotFound(); // Return 404 if request not found
            }

            return Ok(updatedRequest); // Return OK with the updated request
        }
        catch (BusinessRuleValidationException ex)
        {
            return BadRequest(new { Message = ex.Message }); // Return 400 if any business rule fails
        }
    }

    // DELETE: api/OperationRequest/5
    [Authorize(Roles = "Admin, Doctor")]
    [HttpDelete("{id}")]
    public async Task<ActionResult<OperationRequestDto>> Delete(Guid id)
    {
        try // Try to delete the request
        {
            var deletedRequest = await _operationRequestService.DeleteOperationRequestAsync(new OperationRequestId(id));

            if (deletedRequest == null)
            {
                return NotFound(); // Return 404 if request not found
            }

            return Ok(deletedRequest); // Return OK with the deleted request
        }
        catch (BusinessRuleValidationException ex)
        {
            return BadRequest(new { Message = ex.Message }); // Return 400 if any business rule fails
        }
    }
}