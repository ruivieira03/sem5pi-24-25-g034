/*
using Xunit;
using Moq;
using System;
using System.Threading.Tasks;

public class EditPatientTests
{
    private readonly Mock<IPatientRepository> _patientRepositoryMock;
    private readonly Mock<IEmailService> _emailServiceMock;
    private readonly Mock<IAuditLogRepository> _auditLogRepositoryMock;
    private readonly PatientService _patientService;

    public EditPatienTests()
    {
        _patientRepositoryMock = new Mock<IPatientRepository>();
        _emailServiceMock = new Mock<IEmailService>();
        _auditLogRepositoryMock = new Mock<IAuditLogRepository>();
        _patientService = new PatientService(_patientRepositoryMock.Object, _emailServiceMock.Object, _auditLogRepositoryMock.Object);
    }

    [Fact]
    public async Task UpdateProfile_ShouldUpdatePatientDetails_WhenValidData()
    {
        // Arrange
        var patientId = Guid.NewGuid();
        var model = new UpdateProfileViewModel
        {
            FirstName = "John",
            LastName = "Doe",
            PhoneNumber = "987654321",
            EmergencyContact = "Jane Doe"
        };

        var existingPatient = new Patient { Id = patientId, PhoneNumber = "123456789" };
        _patientRepositoryMock.Setup(repo => repo.GetByIdAsync(It.IsAny<Guid>())).ReturnsAsync(existingPatient);

        // Act
        var result = await _patientService.UpdateProfileAsync(model, patientId);

        // Assert
        Assert.Equal(model.FirstName, result.FirstName);
        Assert.Equal(model.PhoneNumber, result.PhoneNumber);

        // Verifica que o email foi enviado
        _emailServiceMock.Verify(email => email.SendEmailAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>()), Times.Once);

        // Verifica que o log de auditoria foi registrado
        _auditLogRepositoryMock.Verify(audit => audit.AddLogAsync(It.IsAny<AuditLog>()), Times.Once);
    }
    
}
*/
