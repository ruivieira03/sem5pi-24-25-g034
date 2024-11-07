using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Moq;
using Xunit;
using Hospital.Domain.Patients;
using Hospital.Domain.Shared;
using Hospital.Domain.Users.SystemUser;
using Hospital.Services;
using Hospital.ViewModels;

namespace Hospital.Tests.Domain.Unit{
    public class PatientRegistrationServiceTests
    {
        private readonly Mock<IPatientRepository> _patientRepositoryMock;
        private readonly Mock<IUnitOfWork> _unitOfWorkMock;
        private readonly Mock<ISystemUserRepository> _systemUserRepositoryMock;
        private readonly Mock<IEmailService> _emailServiceMock;
        private readonly PatientRegistrationService _patientRegistrationService;

        public PatientRegistrationServiceTests()
        {
            _patientRepositoryMock = new Mock<IPatientRepository>();
            _unitOfWorkMock = new Mock<IUnitOfWork>();
            _systemUserRepositoryMock = new Mock<ISystemUserRepository>();
            _emailServiceMock = new Mock<IEmailService>();
            _patientRegistrationService = new PatientRegistrationService(_unitOfWorkMock.Object, _systemUserRepositoryMock.Object, _emailServiceMock.Object, _patientRepositoryMock.Object);
        }

        [Fact]
        public async Task RegisterPatientProfileAsync_ShouldThrowException_WhenEmailIsTaken(){
            // Arrange
            var model = new RegisterPatientProfileViewModel { Email = "test@example.com", PhoneNumber = "123456789" };
            _patientRepositoryMock.Setup(r => r.GetPatientByEmailAsync(model.Email)).ReturnsAsync(new Patient());

            // Act & Assert
            await Assert.ThrowsAsync<Exception>(() => _patientRegistrationService.RegisterPatientProfileAsync(model));
        }

        [Fact]
        public async Task RegisterPatientProfileAsync_ShouldThrowException_WhenPhoneNumberIsTaken()
        {
            // Arrange
            var model = new RegisterPatientProfileViewModel { Email = "unique@example.com", PhoneNumber = "123456789" };
            _patientRepositoryMock.Setup(r => r.GetPatientByPhoneNumberAsync(model.PhoneNumber)).ReturnsAsync(new Patient());

            // Act & Assert
            await Assert.ThrowsAsync<Exception>(() => _patientRegistrationService.RegisterPatientProfileAsync(model));
        }

      [Fact]
public async Task RegisterPatientProfileAsync_ShouldRegisterPatientAndCommit(){
    // Arrange
    var model = new RegisterPatientProfileViewModel{
        FirstName = "John",
        LastName = "Doe",
        DateOfBirth = new DateTime(1990, 1, 1),
        Gender = "Male",
        Email = "john.doe@example.com",
        PhoneNumber = "123456789",
        EmergencyContact = "Jane Doe",
        AppointmentHistory = new List<string>(),
        AllergiesOrMedicalConditions = new List<string>()
    };
    
    // Configurar o mock para retornar `null` para verificações de email e número de telefone
    _patientRepositoryMock.Setup(r => r.GetPatientByEmailAsync(model.Email)).ReturnsAsync((Patient)null);
    _patientRepositoryMock.Setup(r => r.GetPatientByPhoneNumberAsync(model.PhoneNumber)).ReturnsAsync((Patient)null);

    // Configurar o mock para `GetAllAsync` para evitar o erro de NullReferenceException
    _patientRepositoryMock.Setup(r => r.GetAllAsync()).ReturnsAsync(new List<Patient>());

    // Act
    var result = await _patientRegistrationService.RegisterPatientProfileAsync(model);

    // Assert
    Assert.Equal(model.FirstName, result.FirstName);
    Assert.Equal(model.Email, result.Email);
    _patientRepositoryMock.Verify(r => r.AddPatientAsync(It.IsAny<Patient>()), Times.Once);
    _unitOfWorkMock.Verify(u => u.CommitAsync(), Times.Once);
}


        [Fact]
        public void GenerateMedicalRecordNumber_ShouldGenerateCorrectFormat(){
            // Arrange
            _patientRepositoryMock.Setup(r => r.GetAllAsync()).ReturnsAsync(new List<Patient> { new Patient(), new Patient() });

            // Act
            var result = _patientRegistrationService.GenerateMedicalRecordNumber();

            // Assert
            Assert.StartsWith(DateTime.Now.ToString("yyyyMM"), result);
            Assert.EndsWith("000002", result);
        }
    }
}
