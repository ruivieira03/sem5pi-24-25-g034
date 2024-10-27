using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace sem5pi_24_25_g202.Migrations
{
    /// <inheritdoc />
    public partial class MakeSystemUserIdNullable4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Patients",
                keyColumn: "Id",
                keyValue: new Guid("44c338c7-7e40-423a-9705-3a4112be3059"));

            migrationBuilder.DeleteData(
                table: "Patients",
                keyColumn: "Id",
                keyValue: new Guid("b1352320-8dc6-4364-aa33-542affea3583"));

            migrationBuilder.DeleteData(
                table: "SystemUser",
                keyColumn: "Id",
                keyValue: new Guid("3771918f-5c1b-4810-b857-3b08c5ec63f6"));

            migrationBuilder.DeleteData(
                table: "SystemUser",
                keyColumn: "Id",
                keyValue: new Guid("5006ec35-1419-4f35-b4b3-b690688811a6"));

            migrationBuilder.DeleteData(
                table: "SystemUser",
                keyColumn: "Id",
                keyValue: new Guid("6cb11726-faa3-46df-8d8f-24cf78a59c4e"));

            migrationBuilder.InsertData(
                table: "Patients",
                columns: new[] { "Id", "AllergiesOrMedicalConditions", "AppointmentHistory", "DateOfBirth", "Email", "EmergencyContact", "FirstName", "Gender", "LastName", "MedicalRecordNumber", "PhoneNumber" },
                values: new object[,]
                {
                    { new Guid("4fcc3191-5a50-491e-9544-281d78217be6"), "[\"Nut allergy\"]", "[\"Vaccination on 2023-05-15\"]", new DateTime(1999, 10, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "ruimdvieir@gmail.com", "0987654322", "Rui", "Male", "Vieira", "MRN987654", "1234567891" },
                    { new Guid("91dae9c7-17f0-4bba-8b50-eab6c8753f39"), "[\"Penicillin allergy\"]", "[\"Checkup on 2024-01-20\"]", new DateTime(1985, 5, 21, 0, 0, 0, 0, DateTimeKind.Unspecified), "1220741@isep.ipp.pt", "0987654321", "Bernardo", "Male", "Giao", "MRN123456", "1234567890" }
                });

            migrationBuilder.InsertData(
                table: "SystemUser",
                columns: new[] { "Id", "Email", "IAMId", "Password", "PhoneNumber", "ResetToken", "Role", "TokenExpiry", "Username", "VerifyToken", "isVerified" },
                values: new object[,]
                {
                    { new Guid("5f294de5-78e3-4f62-8655-b7d7e144e8b1"), "ruimdv13@gmail.com", "1", "SEM5pi1234@", "912028969", "", 0, null, "adminUser", "", true },
                    { new Guid("c7d8a2a5-057d-4e2b-9840-f73178520f61"), "doctor@hospital.com", "2", "SEM5pi1234@", "1234567891", "", 1, null, "doctorUser", "", true },
                    { new Guid("fde98791-34c2-4da3-9771-c121f520277e"), "nurse@hospital.com", "3", "SEM5pi1234@", "1234567892", "", 2, null, "nurseUser", "", true }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Patients",
                keyColumn: "Id",
                keyValue: new Guid("4fcc3191-5a50-491e-9544-281d78217be6"));

            migrationBuilder.DeleteData(
                table: "Patients",
                keyColumn: "Id",
                keyValue: new Guid("91dae9c7-17f0-4bba-8b50-eab6c8753f39"));

            migrationBuilder.DeleteData(
                table: "SystemUser",
                keyColumn: "Id",
                keyValue: new Guid("5f294de5-78e3-4f62-8655-b7d7e144e8b1"));

            migrationBuilder.DeleteData(
                table: "SystemUser",
                keyColumn: "Id",
                keyValue: new Guid("c7d8a2a5-057d-4e2b-9840-f73178520f61"));

            migrationBuilder.DeleteData(
                table: "SystemUser",
                keyColumn: "Id",
                keyValue: new Guid("fde98791-34c2-4da3-9771-c121f520277e"));

            migrationBuilder.InsertData(
                table: "Patients",
                columns: new[] { "Id", "AllergiesOrMedicalConditions", "AppointmentHistory", "DateOfBirth", "Email", "EmergencyContact", "FirstName", "Gender", "LastName", "MedicalRecordNumber", "PhoneNumber" },
                values: new object[,]
                {
                    { new Guid("44c338c7-7e40-423a-9705-3a4112be3059"), "[\"Nut allergy\"]", "[\"Vaccination on 2023-05-15\"]", new DateTime(1999, 10, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "ruimdvieir@gmail.com", "0987654322", "Rui", "Male", "Vieira", "MRN987654", "1234567891" },
                    { new Guid("b1352320-8dc6-4364-aa33-542affea3583"), "[\"Penicillin allergy\"]", "[\"Checkup on 2024-01-20\"]", new DateTime(1985, 5, 21, 0, 0, 0, 0, DateTimeKind.Unspecified), "1220741@isep.ipp.pt", "0987654321", "Bernardo", "Male", "Giao", "MRN123456", "1234567890" }
                });

            migrationBuilder.InsertData(
                table: "SystemUser",
                columns: new[] { "Id", "Email", "IAMId", "Password", "PhoneNumber", "ResetToken", "Role", "TokenExpiry", "Username", "VerifyToken", "isVerified" },
                values: new object[,]
                {
                    { new Guid("3771918f-5c1b-4810-b857-3b08c5ec63f6"), "ruimdv13@gmail.com", "1", "SEM5pi1234@", "912028969", "", 0, null, "adminUser", "", true },
                    { new Guid("5006ec35-1419-4f35-b4b3-b690688811a6"), "nurse@hospital.com", "3", "SEM5pi1234@", "1234567892", "", 2, null, "nurseUser", "", true },
                    { new Guid("6cb11726-faa3-46df-8d8f-24cf78a59c4e"), "doctor@hospital.com", "2", "SEM5pi1234@", "1234567891", "", 1, null, "doctorUser", "", true }
                });
        }
    }
}
