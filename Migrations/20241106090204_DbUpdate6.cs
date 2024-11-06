using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace sem5pi_24_25_g202.Migrations
{
    /// <inheritdoc />
    public partial class DbUpdate6 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Patients",
                keyColumn: "Id",
                keyValue: new Guid("1ba79918-ba81-4be4-9021-3a21816b4870"));

            migrationBuilder.DeleteData(
                table: "Patients",
                keyColumn: "Id",
                keyValue: new Guid("59b71702-b88c-4693-9f27-fa2d4c64bdd6"));

            migrationBuilder.DeleteData(
                table: "SystemUser",
                keyColumn: "Id",
                keyValue: new Guid("4260c00c-2650-4c27-aab1-6c267fd4ef68"));

            migrationBuilder.DeleteData(
                table: "SystemUser",
                keyColumn: "Id",
                keyValue: new Guid("80af1948-14d7-44f1-b46b-151f799a123e"));

            migrationBuilder.DeleteData(
                table: "SystemUser",
                keyColumn: "Id",
                keyValue: new Guid("c7537641-3f3f-4a51-9d4c-7da2f519c0e8"));

            migrationBuilder.AlterColumn<string>(
                name: "AppointmentHistory",
                table: "Patients",
                type: "longtext",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "longtext")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.InsertData(
                table: "Patients",
                columns: new[] { "Id", "AllergiesOrMedicalConditions", "AppointmentHistory", "DateOfBirth", "Email", "EmergencyContact", "FirstName", "Gender", "LastName", "MedicalRecordNumber", "PhoneNumber" },
                values: new object[,]
                {
                    { new Guid("5cbf6f60-cc47-4c22-862e-a44abf91b73b"), "[\"Nut allergy\"]", "[\"Vaccination on 2023-05-15\"]", new DateTime(1999, 10, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "ruimdvieir@gmail.com", "0987654322", "Rui", "Male", "Vieira", "MRN987654", "1234567891" },
                    { new Guid("9234a2e3-06d4-44ce-956e-5dc2130a6e2c"), "[\"Penicillin allergy\"]", "[\"Checkup on 2024-01-20\"]", new DateTime(1985, 5, 21, 0, 0, 0, 0, DateTimeKind.Unspecified), "1220741@isep.ipp.pt", "0987654321", "Bernardo", "Male", "Giao", "MRN123456", "1234567890" }
                });

            migrationBuilder.InsertData(
                table: "SystemUser",
                columns: new[] { "Id", "DeleteToken", "Email", "IAMId", "Password", "PatientId", "PhoneNumber", "ResetToken", "Role", "TokenExpiry", "Username", "VerifyToken", "isVerified" },
                values: new object[,]
                {
                    { new Guid("714b5b34-0a0d-4429-806b-9d918f526a9d"), null, "nurse@hospital.com", "3", "bf32388f0f958a12428ebc237a8d0863265e795ceb5c5f3d013b062f75bfad9e", null, "1234567892", null, 2, null, "nurseUser", null, true },
                    { new Guid("7ce6b5b0-f4fb-4c76-a4b5-e79d00cab39d"), null, "ruimdv13@gmail.com", "1", "bf32388f0f958a12428ebc237a8d0863265e795ceb5c5f3d013b062f75bfad9e", null, "912028969", null, 0, null, "adminUser", null, true },
                    { new Guid("a76e8d76-ae3c-4c89-9b6e-46239c87bcdd"), null, "doctor@hospital.com", "2", "bf32388f0f958a12428ebc237a8d0863265e795ceb5c5f3d013b062f75bfad9e", null, "1234567891", null, 1, null, "doctorUser", null, true }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Patients",
                keyColumn: "Id",
                keyValue: new Guid("5cbf6f60-cc47-4c22-862e-a44abf91b73b"));

            migrationBuilder.DeleteData(
                table: "Patients",
                keyColumn: "Id",
                keyValue: new Guid("9234a2e3-06d4-44ce-956e-5dc2130a6e2c"));

            migrationBuilder.DeleteData(
                table: "SystemUser",
                keyColumn: "Id",
                keyValue: new Guid("714b5b34-0a0d-4429-806b-9d918f526a9d"));

            migrationBuilder.DeleteData(
                table: "SystemUser",
                keyColumn: "Id",
                keyValue: new Guid("7ce6b5b0-f4fb-4c76-a4b5-e79d00cab39d"));

            migrationBuilder.DeleteData(
                table: "SystemUser",
                keyColumn: "Id",
                keyValue: new Guid("a76e8d76-ae3c-4c89-9b6e-46239c87bcdd"));

            migrationBuilder.UpdateData(
                table: "Patients",
                keyColumn: "AppointmentHistory",
                keyValue: null,
                column: "AppointmentHistory",
                value: "");

            migrationBuilder.AlterColumn<string>(
                name: "AppointmentHistory",
                table: "Patients",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext",
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.InsertData(
                table: "Patients",
                columns: new[] { "Id", "AllergiesOrMedicalConditions", "AppointmentHistory", "DateOfBirth", "Email", "EmergencyContact", "FirstName", "Gender", "LastName", "MedicalRecordNumber", "PhoneNumber" },
                values: new object[,]
                {
                    { new Guid("1ba79918-ba81-4be4-9021-3a21816b4870"), "[\"Penicillin allergy\"]", "[\"Checkup on 2024-01-20\"]", new DateTime(1985, 5, 21, 0, 0, 0, 0, DateTimeKind.Unspecified), "1220741@isep.ipp.pt", "0987654321", "Bernardo", "Male", "Giao", "MRN123456", "1234567890" },
                    { new Guid("59b71702-b88c-4693-9f27-fa2d4c64bdd6"), "[\"Nut allergy\"]", "[\"Vaccination on 2023-05-15\"]", new DateTime(1999, 10, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "ruimdvieir@gmail.com", "0987654322", "Rui", "Male", "Vieira", "MRN987654", "1234567891" }
                });

            migrationBuilder.InsertData(
                table: "SystemUser",
                columns: new[] { "Id", "DeleteToken", "Email", "IAMId", "Password", "PatientId", "PhoneNumber", "ResetToken", "Role", "TokenExpiry", "Username", "VerifyToken", "isVerified" },
                values: new object[,]
                {
                    { new Guid("4260c00c-2650-4c27-aab1-6c267fd4ef68"), null, "doctor@hospital.com", "2", "SEM5pi1234@", null, "1234567891", null, 1, null, "doctorUser", null, true },
                    { new Guid("80af1948-14d7-44f1-b46b-151f799a123e"), null, "ruimdv13@gmail.com", "1", "SEM5pi1234@", null, "912028969", null, 0, null, "adminUser", null, true },
                    { new Guid("c7537641-3f3f-4a51-9d4c-7da2f519c0e8"), null, "nurse@hospital.com", "3", "SEM5pi1234@", null, "1234567892", null, 2, null, "nurseUser", null, true }
                });
        }
    }
}
