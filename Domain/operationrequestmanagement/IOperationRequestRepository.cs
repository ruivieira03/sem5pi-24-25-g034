using System.Threading.Tasks;
using Hospital.Domain.operationrequestmanagement;

namespace Hospital.Domain.operationrequestmanagement
{
    public interface IOperationRequestRepository
    {
        Task<OperationRequest> GetByIdAsync(OperationRequestId id); // Get request by Id
        Task<OperationRequest> GetOperationRequestsByPatientAsync(string name); // Get all requests by patient name
        Task<OperationRequest> GetOperationRequestsByTypeAsync(string operationTypeId); // Get all requests by type
        Task<OperationRequest> GetOperationRequestsByPriorityAsync(int priority); // Get all requests by priority
        Task<OperationRequest> GetOperationRequestsByStatusAsync(string status); // Get all requests by status
        Task AddUserAsync(OperationRequest request); // Add a new request
        Task UpdateUserAsync(OperationRequest request); // Update an existing request
        Task Remove(OperationRequest request); // Remove a request
        Task<List<OperationRequest>> GetAllAsync(); // Get all operation requests
    }
}