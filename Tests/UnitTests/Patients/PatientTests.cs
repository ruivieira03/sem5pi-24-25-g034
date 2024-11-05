/*
namespace Hospital.Tests.Domain;

using System;
using Hospital.Domain.Users.SystemUser;
using Hospital.Domain.Patients;
using Xunit;

    public class SystemUserTests{

        [Fact]
        public void createPatient(){

    
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

      

    } 
       */
    
