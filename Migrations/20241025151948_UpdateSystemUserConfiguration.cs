using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace sem5pi_24_25_g202.Migrations
{
    /// <inheritdoc />
    public partial class UpdateSystemUserConfiguration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "SystemUser",
                keyColumn: "Id",
                keyValue: new Guid("363a9c92-d641-4d1f-8a94-2c09638400a6"));

            migrationBuilder.DeleteData(
                table: "SystemUser",
                keyColumn: "Id",
                keyValue: new Guid("439f9210-0c60-4437-a09f-6d92824920fb"));

            migrationBuilder.DeleteData(
                table: "SystemUser",
                keyColumn: "Id",
                keyValue: new Guid("60127f45-3395-4d3d-aecd-59864e57199c"));

            migrationBuilder.InsertData(
                table: "SystemUser",
                columns: new[] { "Id", "Email", "IAMId", "Password", "PhoneNumber", "ResetToken", "Role", "TokenExpiry", "Username" },
                values: new object[,]
                {
                    { new Guid("6bfa9c6f-6156-412d-8b39-feb2e83b9542"), "ruimdv13@gmail.com", "1", "SEM5pi1234@", "912028969", "", 0, null, "adminUser" },
                    { new Guid("ac80239e-cfc6-4cfa-9867-909df44e51a1"), "nurse@hospital.com", "3", "SEM5pi1234@", "1234567892", "", 2, null, "nurseUser" },
                    { new Guid("fb8f1a9c-38ab-498b-830d-67581d8be8a9"), "doctor@hospital.com", "2", "SEM5pi1234@", "1234567891", "", 1, null, "doctorUser" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "SystemUser",
                keyColumn: "Id",
                keyValue: new Guid("6bfa9c6f-6156-412d-8b39-feb2e83b9542"));

            migrationBuilder.DeleteData(
                table: "SystemUser",
                keyColumn: "Id",
                keyValue: new Guid("ac80239e-cfc6-4cfa-9867-909df44e51a1"));

            migrationBuilder.DeleteData(
                table: "SystemUser",
                keyColumn: "Id",
                keyValue: new Guid("fb8f1a9c-38ab-498b-830d-67581d8be8a9"));

            migrationBuilder.InsertData(
                table: "SystemUser",
                columns: new[] { "Id", "Email", "IAMId", "Password", "PhoneNumber", "ResetToken", "Role", "TokenExpiry", "Username" },
                values: new object[,]
                {
                    { new Guid("363a9c92-d641-4d1f-8a94-2c09638400a6"), "ruimdv13@gmail.com", "1", "SEM5pi1234@", "912028969", "", 0, null, "adminUser" },
                    { new Guid("439f9210-0c60-4437-a09f-6d92824920fb"), "nurse@hospital.com", "3", "SEM5pi1234@", "1234567892", "", 2, null, "nurseUser" },
                    { new Guid("60127f45-3395-4d3d-aecd-59864e57199c"), "doctor@hospital.com", "2", "SEM5pi1234@", "1234567891", "", 1, null, "doctorUser" }
                });
        }
    }
}
