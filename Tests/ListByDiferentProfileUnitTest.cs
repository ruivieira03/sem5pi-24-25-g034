

/*
[Fact]
public async Task ListPatientsByDifferentAttributes_ShouldReturnPatients_WhenPatientsExist()
{
    // Arrange
    var patients = new List<Patient>
    {
        new Patient { FirstName = "John", LastName = "Doe", Email = "john@example.com" },
        new Patient { FirstName = "Jane", LastName = "Doe", Email = "jane@example.com" }
    };

    _patientRepositoryMock.Setup(repo => repo.GetAllAsync()).ReturnsAsync(patients);

    // Act
    var result = await _patientService.ListPatiensByDifferentAttributes();

    // Assert
    Assert.NotNull(result);
    Assert.Equal(2, result.Count);
    Assert.Equal("John", result[0].FirstName);
    Assert.Equal("Jane", result[1].FirstName);
}




*/