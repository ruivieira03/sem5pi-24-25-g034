
using System;
using System.Threading.Tasks;
using Xunit;
using Moq;
using Hospital.Domain.Patients;
using Hospital.Domain.Shared;
using Hospital.Controllers;
using Microsoft.AspNetCore.Mvc;

public class RegisterPatientProfileUnitTests{
    private readonly Mock<IPatientRepository> _patientRepositoryMock;
    private readonly Mock<IUnitOfWork> _unitOfWorkMock;
    private readonly PatientService _patientService;

    public PatientServiceTests()
    {
        _patientRepositoryMock = new Mock<IPatientRepository>();
        _unitOfWorkMock = new Mock<IUnitOfWork>();
        _patientService = new PatientService(_patientRepositoryMock.Object, _unitOfWorkMock.Object);
    }




    [Fact]
    public async Task RegisterPatientProfileAsync_ShouldCreatePatient_WhenDataIsValid(){
        // Arrange
        var model = new PatientProfileViewModel
        {
            FirstName = "John",
            LastName = "Doe",
            DateOfBirth = new DateTime(1985, 1, 1),
            Gender = "Male",
            MedicalRecordNumber = "MRN123456",
            Email = "john.doe@example.com",
            PhoneNumber = "123456789",
            EmergencyContact = "Jane Doe"
        };

        _patientRepositoryMock.Setup(repo => repo.GetPatientByEmailAsync(model.Email))
            .ReturnsAsync((Patient)null);
        _patientRepositoryMock.Setup(repo => repo.GetPatientByPhoneNumberAsync(model.PhoneNumber))
            .ReturnsAsync((Patient)null);

        // Act
        var result = await _patientService.RegisterPatientProfileAsync(model);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(model.FirstName, result.FirstName);
        Assert.Equal(model.LastName, result.LastName);
        Assert.Equal(model.Email, result.Email);

        _patientRepositoryMock.Verify(repo => repo.AddPatientAsync(It.IsAny<Patient>()), Times.Once);
        _unitOfWorkMock.Verify(uow => uow.CommitAsync(), Times.Once);
    }


    [Fact]
    public async Task RegisterPatientProfileAsync_ShouldThrowException_WhenEmailIsAlreadyInUse()
    {
        // Arrange
        var model = new PatientProfileViewModel
        {
            Email = "existing@example.com",
            PhoneNumber = "123456789"
        };

        _patientRepositoryMock.Setup(repo => repo.GetPatientByEmailAsync(model.Email))
            .ReturnsAsync(new Patient()); // Simula um paciente com o mesmo email

        // Act & Assert
        var exception = await Assert.ThrowsAsync<Exception>(() => _patientService.RegisterPatientProfileAsync(model));
        Assert.Equal("Email already taken.", exception.Message);

        _patientRepositoryMock.Verify(repo => repo.GetPatientByEmailAsync(model.Email), Times.Once);
        _patientRepositoryMock.Verify(repo => repo.AddPatientAsync(It.IsAny<Patient>()), Times.Never);
    }


        [Fact]
    public async Task RegisterPatientProfileAsync_ShouldThrowException_WhenPhoneNumberIsAlreadyInUse()
    {
        // Arrange
        var model = new PatientProfileViewModel
        {
            Email = "newuser@example.com",
            PhoneNumber = "existing-phone"
        };

        _patientRepositoryMock.Setup(repo => repo.GetPatientByPhoneNumberAsync(model.PhoneNumber))
            .ReturnsAsync(new Patient()); // Simula um paciente com o mesmo telefone

        // Act & Assert
        var exception = await Assert.ThrowsAsync<Exception>(() => _patientService.RegisterPatientProfileAsync(model));
        Assert.Equal("Phone Number already in use.", exception.Message);

        _patientRepositoryMock.Verify(repo => repo.GetPatientByPhoneNumberAsync(model.PhoneNumber), Times.Once);
        _patientRepositoryMock.Verify(repo => repo.AddPatientAsync(It.IsAny<Patient>()), Times.Never);
    }


    public class PatientControllerTests
{
    private readonly Mock<IPatientRegistrationService> _patientRegistrationServiceMock;
    private readonly PatientController _patientController;

    public PatientControllerTests()
    {
        _patientRegistrationServiceMock = new Mock<IPatientRegistrationService>();
        _patientController = new PatientController(_patientRegistrationServiceMock.Object);
    }

    [Fact]
    public async Task RegisterPatientProfile_ShouldReturnCreated_WhenPatientIsRegisteredSuccessfully()
    {
        // Arrange
        var model = new PatientProfileViewModel
        {
            FirstName = "John",
            LastName = "Doe",
            DateOfBirth = new DateTime(1985, 1, 1),
            Gender = "Male",
            MedicalRecordNumber = "MRN123456",
            Email = "john.doe@example.com",
            PhoneNumber = "123456789",
            EmergencyContact = "Jane Doe"
        };

        var patientDto = new PatientDto
        {
            Id = Guid.NewGuid(),
            FirstName = "John",
            LastName = "Doe",
            Email = "john.doe@example.com"
        };

        _patientRegistrationServiceMock.Setup(service => service.RegisterPatientProfileAsync(model))
            .ReturnsAsync(patientDto);

        // Act
        var result = await _patientController.RegisterPatientProfile(model) as CreatedAtActionResult;

        // Assert
        Assert.NotNull(result);
        Assert.Equal("RegisterPatientProfile", result.ActionName);
        Assert.Equal(patientDto, result.Value);
        Assert.Equal(201, result.StatusCode);
    }
}




}
