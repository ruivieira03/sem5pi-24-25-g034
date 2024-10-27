using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Hospital.ViewModels;
using Hospital.Domain.Shared;
using Hospital.Services;

namespace Hospital.Domain.operationrequestmanagement
{
    public class OperationRequestService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IOperationRequestRepository _operationRequestRepository;

        public OperationRequestService(IUnitOfWork unitOfWork, IOperationRequestRepository operationRequestRepository)
        {
            this._unitOfWork = unitOfWork;
            this._operationRequestRepository = operationRequestRepository;
        }

        public async Task<OperationRequestDto> CreateOperationRequestAsync(CreateOperationRequestViewModel model)
        {
            // Create a new OperationRequest
            var newRequest = new OperationRequest(
                new OperationRequestId(Guid.NewGuid()),
                model.PatientID,
                model.DoctorID,
                model.OperationTypeID,
                model.DeadlineDate,
                model.Priority
            );

            // Save the request to the repository
            await _operationRequestRepository.AddUserAsync(newRequest);

            // Commit the transaction
            await _unitOfWork.CommitAsync();

            // Return a DTO with the new request’s details
            return new OperationRequestDto
            {
                ID = newRequest.ID,
                PatientID = newRequest.PatientID,
                DoctorID = newRequest.DoctorID,
                OperationTypeID = newRequest.OperationTypeID,
                DeadlineDate = newRequest.DeadlineDate,
                Priority = newRequest.Priority
            };
        }

        //fetch all operation requests
        public async Task<IEnumerable<OperationRequestDto>> GetAllOperationRequestsAsync()
        {
            // Get all operation requests from the repository
            var requests = await _operationRequestRepository.GetAllAsync();

            // Map the requests to DTOs
            return requests.Select(request => new OperationRequestDto
            {
                ID = request.ID,
                PatientID = request.PatientID,
                DoctorID = request.DoctorID,
                OperationTypeID = request.OperationTypeID,
                DeadlineDate = request.DeadlineDate,
                Priority = request.Priority
            });
        }
    }
}