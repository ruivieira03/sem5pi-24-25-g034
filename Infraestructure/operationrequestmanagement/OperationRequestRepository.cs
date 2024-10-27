using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Hospital.Domain.operationrequestmanagement;

namespace Hospital.Infraestructure.operationrequestmanagement
{
    public class OperationRequestRepository : IOperationRequestRepository
    {
        // The DbContext instance used to interact with the database
        private readonly HospitalDbContext _context;

        // Constructor that initializes the repository with a DbContext instance
        public OperationRequestRepository(HospitalDbContext context)
        {
            _context = context;
        }

        // Retrieves an OperationRequest by its unique identifier
        public async Task<OperationRequest> GetByIdAsync(OperationRequestId id)
        {
            return await _context.OperationRequests.FirstOrDefaultAsync(request => request.ID == id);
        }

        // Retrieves an OperationRequest by the patient's name
        public async Task<OperationRequest> GetOperationRequestsByPatientAsync(string name)
        {
            return await _context.OperationRequests.FirstOrDefaultAsync(request => request.PatientID == name);
        }

        // Retrieves an OperationRequest by the operation type identifier
        public async Task<OperationRequest> GetOperationRequestsByTypeAsync(string operationTypeId)
        {
            return await _context.OperationRequests.FirstOrDefaultAsync(request => request.OperationTypeID == operationTypeId);
        }

        // Retrieves an OperationRequest by its priority level
        public async Task<OperationRequest> GetOperationRequestsByPriorityAsync(int priority)
        {
            return await _context.OperationRequests.FirstOrDefaultAsync(request => request.Priority == priority);
        }

        // Retrieves an OperationRequest by its status
        public async Task<OperationRequest> GetOperationRequestsByStatusAsync(string status)
        {
            return await _context.OperationRequests.FirstOrDefaultAsync(request => request.Status == status);
        }

        // Adds a new OperationRequest to the database
        public async Task AddOperationRequestAsync(OperationRequest request)
        {
            await _context.OperationRequests.AddAsync(request);
        }

        // Updates an existing OperationRequest in the database
        public async Task UpdateOperationRequestAsync(OperationRequest request)
        {
            _context.OperationRequests.Update(request);
        }

        // Removes an OperationRequest from the database
        public async Task Remove(OperationRequest request)
        {
            _context.OperationRequests.Remove(request);
        }

        // Retrieves all OperationRequests from the database
        public async Task<List<OperationRequest>> GetAllAsync()
        {
            return await _context.OperationRequests.ToListAsync();
        }
    }
}