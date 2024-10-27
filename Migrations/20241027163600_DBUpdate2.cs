using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace sem5pi_24_25_g202.Migrations
{
    /// <inheritdoc />
    public partial class DBUpdate2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Patients",
                keyColumn: "Id",
                keyValue: new Guid("47b658f7-4538-431a-9f6b-53e9ef4b656e"));

            migrationBuilder.DeleteData(
                table: "Patients",
                keyColumn: "Id",
                keyValue: new Guid("b9326f9f-38a8-4691-960e-5d51cc10a966"));

            migrationBuilder.DeleteData(
                table: "SystemUser",
                keyColumn: "Id",
                keyValue: new Guid("4ad3c670-b682-44df-a109-9d70e18b2303"));

            migrationBuilder.DeleteData(
                table: "SystemUser",
                keyColumn: "Id",
                keyValue: new Guid("5be53628-13ec-4dfc-9278-45c1c76dd464"));

            migrationBuilder.DeleteData(
                table: "SystemUser",
                keyColumn: "Id",
                keyValue: new Guid("d8cd5772-8eed-44d9-adea-35c00afc0ac5"));

            migrationBuilder.AddColumn<Guid>(
                name: "SystemUserId",
                table: "Patients",
                type: "char(36)",
                nullable: true,
                collation: "ascii_general_ci");

            migrationBuilder.InsertData(
                table: "Patients",
                columns: new[] { "Id", "AllergiesOrMedicalConditions", "AppointmentHistory", "DateOfBirth", "Email", "EmergencyContact", "FirstName", "Gender", "LastName", "MedicalRecordNumber", "PhoneNumber", "SystemUserId" },
                values: new object[,]
                {
                    { new Guid("13568b3b-ea11-40fb-8e0b-6cfdc60152e8"), "[\"Nut allergy\"]", "[\"Vaccination on 2023-05-15\"]", new DateTime(1999, 10, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "ruimdvieir@gmail.com", "0987654322", "Rui", "Male", "Vieira", "MRN987654", "1234567891", null },
                    { new Guid("6b1f2567-9eb9-44d6-b409-790e5a1c269a"), "[\"Penicillin allergy\"]", "[\"Checkup on 2024-01-20\"]", new DateTime(1985, 5, 21, 0, 0, 0, 0, DateTimeKind.Unspecified), "1220741@isep.ipp.pt", "0987654321", "Bernardo", "Male", "Giao", "MRN123456", "1234567890", null }
                });

            migrationBuilder.InsertData(
                table: "SystemUser",
                columns: new[] { "Id", "DeleteToken", "Email", "IAMId", "Password", "PhoneNumber", "ResetToken", "Role", "TokenExpiry", "Username", "VerifyToken", "isVerified" },
                values: new object[,]
                {
                    { new Guid("8660bb29-3e10-419f-9046-31ee9611cc1e"), null, "ruimdv13@gmail.com", "1", "SEM5pi1234@", "912028969", null, 0, null, "adminUser", null, true },
                    { new Guid("d164ed88-8e63-48df-b960-bf6a648f88fc"), null, "doctor@hospital.com", "2", "SEM5pi1234@", "1234567891", null, 1, null, "doctorUser", null, true },
                    { new Guid("fc55c720-d790-4ecf-9ec0-ecf5e22744bf"), null, "nurse@hospital.com", "3", "SEM5pi1234@", "1234567892", null, 2, null, "nurseUser", null, true }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Patients_SystemUserId",
                table: "Patients",
                column: "SystemUserId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Patients_SystemUser_SystemUserId",
                table: "Patients",
                column: "SystemUserId",
                principalTable: "SystemUser",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Patients_SystemUser_SystemUserId",
                table: "Patients");

            migrationBuilder.DropIndex(
                name: "IX_Patients_SystemUserId",
                table: "Patients");

            migrationBuilder.DeleteData(
                table: "Patients",
                keyColumn: "Id",
                keyValue: new Guid("13568b3b-ea11-40fb-8e0b-6cfdc60152e8"));

            migrationBuilder.DeleteData(
                table: "Patients",
                keyColumn: "Id",
                keyValue: new Guid("6b1f2567-9eb9-44d6-b409-790e5a1c269a"));

            migrationBuilder.DeleteData(
                table: "SystemUser",
                keyColumn: "Id",
                keyValue: new Guid("8660bb29-3e10-419f-9046-31ee9611cc1e"));

            migrationBuilder.DeleteData(
                table: "SystemUser",
                keyColumn: "Id",
                keyValue: new Guid("d164ed88-8e63-48df-b960-bf6a648f88fc"));

            migrationBuilder.DeleteData(
                table: "SystemUser",
                keyColumn: "Id",
                keyValue: new Guid("fc55c720-d790-4ecf-9ec0-ecf5e22744bf"));

            migrationBuilder.DropColumn(
                name: "SystemUserId",
                table: "Patients");

            migrationBuilder.InsertData(
                table: "Patients",
                columns: new[] { "Id", "AllergiesOrMedicalConditions", "AppointmentHistory", "DateOfBirth", "Email", "EmergencyContact", "FirstName", "Gender", "LastName", "MedicalRecordNumber", "PhoneNumber" },
                values: new object[,]
                {
                    { new Guid("47b658f7-4538-431a-9f6b-53e9ef4b656e"), "[\"Penicillin allergy\"]", "[\"Checkup on 2024-01-20\"]", new DateTime(1985, 5, 21, 0, 0, 0, 0, DateTimeKind.Unspecified), "1220741@isep.ipp.pt", "0987654321", "Bernardo", "Male", "Giao", "MRN123456", "1234567890" },
                    { new Guid("b9326f9f-38a8-4691-960e-5d51cc10a966"), "[\"Nut allergy\"]", "[\"Vaccination on 2023-05-15\"]", new DateTime(1999, 10, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "ruimdvieir@gmail.com", "0987654322", "Rui", "Male", "Vieira", "MRN987654", "1234567891" }
                });

            migrationBuilder.InsertData(
                table: "SystemUser",
                columns: new[] { "Id", "DeleteToken", "Email", "IAMId", "Password", "PhoneNumber", "ResetToken", "Role", "TokenExpiry", "Username", "VerifyToken", "isVerified" },
                values: new object[,]
                {
                    { new Guid("4ad3c670-b682-44df-a109-9d70e18b2303"), null, "ruimdv13@gmail.com", "1", "SEM5pi1234@", "912028969", null, 0, null, "adminUser", null, true },
                    { new Guid("5be53628-13ec-4dfc-9278-45c1c76dd464"), null, "nurse@hospital.com", "3", "SEM5pi1234@", "1234567892", null, 2, null, "nurseUser", null, true },
                    { new Guid("d8cd5772-8eed-44d9-adea-35c00afc0ac5"), null, "doctor@hospital.com", "2", "SEM5pi1234@", "1234567891", null, 1, null, "doctorUser", null, true }
                });
        }
    }
}
