using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Xunit;
using Hospital.Domain.OperationRequest;
using Hospital.Domain.Shared;
using Hospital.ViewModels;

namespace Hospital.Tests.Domain.Integration
{
    public class OperationRequestServiceIntegrationTests : IClassFixture<ServiceProviderFixture>
    {
        private readonly ServiceProvider _serviceProvider;

        public OperationRequestServiceIntegrationTests(ServiceProviderFixture fixture)
        {
            _serviceProvider = fixture.ServiceProvider;
        }

        [Fact]
        public async Task CreateOperationRequestAsync_ShouldCreateRequest()
        {
            // Arrange
            var service = _serviceProvider.GetRequiredService<OperationRequestService>();
            var model = new OperationRequestViewModel
            {
                PatientID = Guid.NewGuid(),
                DoctorID = Guid.NewGuid(),
                OperationTypeID = "some-operation-type-id",
                DeadlineDate = DateTime.UtcNow.AddDays(7),
                Priority = 1
            };

            // Act
            var result = await service.CreateOperationRequestAsync(model);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(model.PatientID, result.PatientID);
            Assert.Equal(model.DoctorID, result.DoctorID);
            Assert.Equal(model.OperationTypeID, result.OperationTypeID);
            Assert.Equal(model.DeadlineDate, result.DeadlineDate);
            Assert.Equal(model.Priority, result.Priority);
        }

        [Fact]
        public async Task GetAllAsync_ShouldReturnAllRequests()
        {
            // Arrange
            var service = _serviceProvider.GetRequiredService<OperationRequestService>();

            // Act
            var result = await service.GetAllAsync();

            // Assert
            Assert.NotNull(result);
            Assert.True(result.Any());
        }

        [Fact]
        public async Task GetByIdAsync_ShouldReturnRequest()
        {
            // Arrange
            var service = _serviceProvider.GetRequiredService<OperationRequestService>();
            var requestId = new OperationRequestId(Guid.NewGuid());

            // Act
            var result = await service.GetByIdAsync(requestId);

            // Assert
            Assert.NotNull(result);
        }

        [Fact]
        public async Task UpdateOperationRequestAsync_ShouldUpdateRequest()
        {
            // Arrange
            var service = _serviceProvider.GetRequiredService<OperationRequestService>();
            var requestId = new OperationRequestId(Guid.NewGuid());
            var dto = new OperationRequestDto
            {
                Id = requestId.AsGuid(),
                OperationTypeID = "updated-type",
                DeadlineDate = DateTime.UtcNow.AddDays(10),
                Priority = 2
            };

            // Act
            var result = await service.UpdateOperationRequestAsync(dto);

            // Assert
            Assert.NotNull(result);
            Assert.Equal("updated-type", result.OperationTypeID);
        }

        [Fact]
        public async Task DeleteOperationRequestAsync_ShouldDeleteRequest()
        {
            // Arrange
            var service = _serviceProvider.GetRequiredService<OperationRequestService>();
            var requestId = new OperationRequestId(Guid.NewGuid());

            // Act
            var result = await service.DeleteOperationRequestAsync(requestId);

            // Assert
            Assert.NotNull(result);
        }
    }
}