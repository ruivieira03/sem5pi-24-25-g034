/*
[Fact]
public async Task DeleteProfile_ShouldDeletePatient_WhenPatientExists()
{
    // Arrange
    var patientId = Guid.NewGuid();
    var patient = new Patient { Id = patientId };

    _patientRepositoryMock.Setup(repo => repo.GetPatientByIdAsync(patientId)).ReturnsAsync(patient);

    // Act
    var result = await _patientService.DeleteProfileAsync(patientId);

    // Assert
    Assert.NotNull(result);
    Assert.Equal(patientId, result.Id);

    // Verifica se a exclusão foi chamada
    _patientRepositoryMock.Verify(repo => repo.Delete(patient), Times.Once);
    _unitOfWorkMock.Verify(uow => uow.CommitAsync(), Times.Once);

    // Verifica o log de auditoria
    _auditLogRepositoryMock.Verify(audit => audit.AddLogAsync(It.IsAny<AuditLog>()), Times.Once);
}

[Fact]
public async Task DeleteProfile_ShouldReturnNotFound_WhenPatientDoesNotExist()
{
    // Arrange
    var patientId = Guid.NewGuid();
    _patientRepositoryMock.Setup(repo => repo.GetPatientByIdAsync(patientId)).ReturnsAsync((Patient)null);

    // Act
    Func<Task> act = async () => await _patientService.DeleteProfileAsync(patientId);

    // Assert
    var exception = await Assert.ThrowsAsync<BusinessRuleValidationException>(act);
    Assert.Equal("Paciente não encontrado.", exception.Message);
}

*/
