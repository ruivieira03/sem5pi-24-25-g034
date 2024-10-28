using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace sem5pi_24_25_g202.Migrations
{
    /// <inheritdoc />
    public partial class Migration1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Patients",
                keyColumn: "Id",
                keyValue: new Guid("642cc6d8-9347-41bf-8e37-cb670338e751"));

            migrationBuilder.DeleteData(
                table: "Patients",
                keyColumn: "Id",
                keyValue: new Guid("bcb27a69-7728-4c82-b263-c4923301e705"));

            migrationBuilder.DeleteData(
                table: "SystemUser",
                keyColumn: "Id",
                keyValue: new Guid("3b5df397-d6e5-4ab9-b377-5cc86a4062f4"));

            migrationBuilder.DeleteData(
                table: "SystemUser",
                keyColumn: "Id",
                keyValue: new Guid("47e64300-8979-4bdb-a89c-84791030d559"));

            migrationBuilder.DeleteData(
                table: "SystemUser",
                keyColumn: "Id",
                keyValue: new Guid("6478ac18-770f-4ce9-b0cc-71b6645dab2c"));

            migrationBuilder.AlterColumn<string>(
                name: "AppointmentHistory",
                table: "Patients",
                type: "varchar(500)",
                maxLength: 500,
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
                    { new Guid("2ee02a42-139a-4ee1-b2ce-742c97874b3c"), "[\"Penicillin allergy\"]", "[\"Checkup on 2024-01-20\"]", new DateTime(1985, 5, 21, 0, 0, 0, 0, DateTimeKind.Unspecified), "1220741@isep.ipp.pt", "0987654321", "Bernardo", "Male", "Giao", "MRN123456", "1234567890" },
                    { new Guid("cf0c7a5e-3a0c-4b99-aa3b-06cfc0edbd47"), "[\"Nut allergy\"]", "[\"Vaccination on 2023-05-15\"]", new DateTime(1999, 10, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "ruimdvieir@gmail.com", "0987654322", "Rui", "Male", "Vieira", "MRN987654", "1234567891" }
                });

            migrationBuilder.InsertData(
                table: "SystemUser",
                columns: new[] { "Id", "DeleteToken", "Email", "IAMId", "Password", "PatientId", "PhoneNumber", "ResetToken", "Role", "TokenExpiry", "Username", "VerifyToken", "isVerified" },
                values: new object[,]
                {
                    { new Guid("05796d3d-9a7e-489d-8c62-cc5f434a603b"), null, "nurse@hospital.com", "3", "SEM5pi1234@", null, "1234567892", null, 2, null, "nurseUser", null, true },
                    { new Guid("25f375f7-f6de-4a67-bed2-cddb321a927e"), null, "doctor@hospital.com", "2", "SEM5pi1234@", null, "1234567891", null, 1, null, "doctorUser", null, true },
                    { new Guid("f3250d27-1636-4639-9105-4f0feb21c6df"), null, "ruimdv13@gmail.com", "1", "SEM5pi1234@", null, "912028969", null, 0, null, "adminUser", null, true }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Patients",
                keyColumn: "Id",
                keyValue: new Guid("2ee02a42-139a-4ee1-b2ce-742c97874b3c"));

            migrationBuilder.DeleteData(
                table: "Patients",
                keyColumn: "Id",
                keyValue: new Guid("cf0c7a5e-3a0c-4b99-aa3b-06cfc0edbd47"));

            migrationBuilder.DeleteData(
                table: "SystemUser",
                keyColumn: "Id",
                keyValue: new Guid("05796d3d-9a7e-489d-8c62-cc5f434a603b"));

            migrationBuilder.DeleteData(
                table: "SystemUser",
                keyColumn: "Id",
                keyValue: new Guid("25f375f7-f6de-4a67-bed2-cddb321a927e"));

            migrationBuilder.DeleteData(
                table: "SystemUser",
                keyColumn: "Id",
                keyValue: new Guid("f3250d27-1636-4639-9105-4f0feb21c6df"));

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
                oldType: "varchar(500)",
                oldMaxLength: 500,
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.InsertData(
                table: "Patients",
                columns: new[] { "Id", "AllergiesOrMedicalConditions", "AppointmentHistory", "DateOfBirth", "Email", "EmergencyContact", "FirstName", "Gender", "LastName", "MedicalRecordNumber", "PhoneNumber" },
                values: new object[,]
                {
                    { new Guid("642cc6d8-9347-41bf-8e37-cb670338e751"), "[\"Nut allergy\"]", "[\"Vaccination on 2023-05-15\"]", new DateTime(1999, 10, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "ruimdvieir@gmail.com", "0987654322", "Rui", "Male", "Vieira", "MRN987654", "1234567891" },
                    { new Guid("bcb27a69-7728-4c82-b263-c4923301e705"), "[\"Penicillin allergy\"]", "[\"Checkup on 2024-01-20\"]", new DateTime(1985, 5, 21, 0, 0, 0, 0, DateTimeKind.Unspecified), "1220741@isep.ipp.pt", "0987654321", "Bernardo", "Male", "Giao", "MRN123456", "1234567890" }
                });

            migrationBuilder.InsertData(
                table: "SystemUser",
                columns: new[] { "Id", "DeleteToken", "Email", "IAMId", "Password", "PatientId", "PhoneNumber", "ResetToken", "Role", "TokenExpiry", "Username", "VerifyToken", "isVerified" },
                values: new object[,]
                {
                    { new Guid("3b5df397-d6e5-4ab9-b377-5cc86a4062f4"), null, "doctor@hospital.com", "2", "SEM5pi1234@", null, "1234567891", null, 1, null, "doctorUser", null, true },
                    { new Guid("47e64300-8979-4bdb-a89c-84791030d559"), null, "nurse@hospital.com", "3", "SEM5pi1234@", null, "1234567892", null, 2, null, "nurseUser", null, true },
                    { new Guid("6478ac18-770f-4ce9-b0cc-71b6645dab2c"), null, "ruimdv13@gmail.com", "1", "SEM5pi1234@", null, "912028969", null, 0, null, "adminUser", null, true }
                });
        }
    }
}
