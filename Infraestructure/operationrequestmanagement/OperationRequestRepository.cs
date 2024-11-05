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

        // Retrieves all OperationRequests by the patient's name
        public async Task<List<OperationRequest>> GetOperationRequestsByPatientAsync(string name)
        {
            return await _context.OperationRequests.Where(request => request.PatientID == name).ToListAsync();
        }

        // Retrieves all OperationRequests by the operation type identifier
        public async Task<List<OperationRequest>> GetOperationRequestsByTypeAsync(string operationTypeId)
        {
            return await _context.OperationRequests.Where(request => request.OperationTypeID == operationTypeId).ToListAsync();
        }

        // Retrieves all OperationRequests by its priority level
        public async Task<List<OperationRequest>> GetOperationRequestsByPriorityAsync(int priority)
        {
            return await _context.OperationRequests.Where(request => request.Priority == priority).ToListAsync();
        }

        // Retrieves all OperationRequests by its status
        public async Task<List<OperationRequest>> GetOperationRequestsByStatusAsync(string status)
        {
            return await _context.OperationRequests.Where(request => request.Status == status).ToListAsync();
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