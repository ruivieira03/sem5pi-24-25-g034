namespace Hospital.Tests;

using System;
using Hospital.Domain.Users.SystemUser;
using Hospital.Domain.Patients;
using Xunit;

    public class SystemUserTests{

        [Fact]
        public void Constructor_ShouldInitialize_AdminUser()
        {
            // Arrange
            string username = "adminUser";
            var role = Roles.Admin;
            string email = "admin@example.com";
            string phoneNumber = "123-456-7890";
            string password = "SecurePassword123!";
            string iamId = Guid.NewGuid().ToString();

            // Act
            var user = new SystemUser(username, role, email, phoneNumber, password, iamId);

            // Assert
            Assert.Equal(username, user.Username);
            Assert.Equal(role, user.Role);
            Assert.Equal(email, user.Email);
            Assert.Equal(phoneNumber, user.PhoneNumber);
            Assert.False(user.isVerified); // Admin users are verified by default
            Assert.NotNull(user.Id);
        }

        [Fact]
        public void Constructor_ShouldThrowException_WhenRoleIsPatient_ForAdminRegistration()
        {
            // Arrange
            string username = "patientUser";
            var role = Roles.Patient; // Invalid role for this constructor
            string email = "patient@example.com";
            string phoneNumber = "123-456-7890";
            string password = "SecurePassword123!";
            string iamId = Guid.NewGuid().ToString();

            // Act & Assert
            var exception = Assert.Throws<InvalidOperationException>(() =>
                new SystemUser(username, role, email, phoneNumber, password, iamId));

            Assert.Equal("Patients must use the self-registration process.", exception.Message);
        }

        [Fact]
        public void Constructor_ShouldInitialize_PatientUser()
        {
            // Arrange
            string username = "patientUser";
            string email = "patient@example.com";
            string phoneNumber = "123-456-7890";
            string password = "SecurePassword123!";
            var patient = new Patient(); // Assuming you have a valid Patient object

            // Act
            var user = new SystemUser(username, email, phoneNumber, password, patient);

            // Assert
            Assert.Equal(username, user.Username);
            Assert.Equal(Roles.Patient, user.Role);
            Assert.Equal(email, user.Email);
            Assert.Equal(phoneNumber, user.PhoneNumber);
            Assert.False(user.isVerified); // Patients are not verified by default
            Assert.NotNull(user.Id);
            Assert.NotNull(user.Patient); // Patient should be associated
        }

        [Fact]
        public void Authenticate_ShouldReturnTrue_WhenCredentialsMatch()
        {
            // Arrange
            string username = "adminUser";
            string iamId = Guid.NewGuid().ToString();
            var user = new SystemUser(username, Roles.Admin, "admin@example.com", "123-456-7890", "SecurePassword123!", iamId);

            // Act
            var result = user.Authenticate(username, iamId);

            // Assert
            Assert.True(result);
        }

        [Fact]
        public void Authenticate_ShouldReturnFalse_WhenCredentialsDoNotMatch()
        {
            // Arrange
            string username = "adminUser";
            string iamId = Guid.NewGuid().ToString();
            var user = new SystemUser(username, Roles.Admin, "admin@example.com", "123-456-7890", "SecurePassword123!", iamId);

            // Act
            var result = user.Authenticate("wrongUser", iamId);

            // Assert
            Assert.False(result);
        }

        [Fact]
        public void Authenticate_ShouldReturnFalse_WhenIAMIdDoesNotMatch()
        {
            // Arrange
            string username = "adminUser";
            string iamId = Guid.NewGuid().ToString();
            var user = new SystemUser(username, Roles.Admin, "admin@example.com", "123-456-7890", "SecurePassword123!", iamId);

            // Act
            var result = user.Authenticate(username, "wrongIamId");

            // Assert
            Assert.False(result);
        }
        
    }

    
