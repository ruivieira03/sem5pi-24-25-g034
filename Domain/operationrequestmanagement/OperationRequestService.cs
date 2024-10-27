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
            await _operationRequestRepository.AddOperationRequestAsync(newRequest);

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
        public async Task<IEnumerable<OperationRequestDto>> GetAllAsync()
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

        //fetch operation request by id
        public async Task<OperationRequestDto> GetByIdAsync(OperationRequestId id)
        {
            // Get the operation request from the repository
            var request = await _operationRequestRepository.GetByIdAsync(id);

            // Map the request to a DTO
            return new OperationRequestDto
            {
                ID = request.ID,
                PatientID = request.PatientID,
                DoctorID = request.DoctorID,
                OperationTypeID = request.OperationTypeID,
                DeadlineDate = request.DeadlineDate,
                Priority = request.Priority
            };
        }

        //Update operation request
        public async Task<OperationRequestDto> UpdateOperationRequestAsync(UpdateOperationRequestViewModel model)
        {
            // Get the operation request from the repository
            var request = await _operationRequestRepository.GetByIdAsync(model.ID);

            // Update the request
            request.Update(
                model.PatientID,
                model.DoctorID,
                model.OperationTypeID,
                model.DeadlineDate,
                model.Priority
            );

            // Save the updated request to the repository
            await _operationRequestRepository.UpdateOperationRequestAsync(request);

            // Commit the transaction
            await _unitOfWork.CommitAsync();

            // Return a DTO with the updated request’s details
            return new OperationRequestDto
            {
                ID = request.ID,
                PatientID = request.PatientID,
                DoctorID = request.DoctorID,
                OperationTypeID = request.OperationTypeID,
                DeadlineDate = request.DeadlineDate,
                Priority = request.Priority
            };
        }

        //Delete operation request
        public async Task DeleteOperationRequestAsync(OperationRequestId id)
        {
            // Get the operation request from the repository
            var request = await _operationRequestRepository.GetByIdAsync(id);

            // Remove the request from the repository
            await _operationRequestRepository.Remove(request);

            // Commit the transaction
            await _unitOfWork.CommitAsync();
        }
    }
}