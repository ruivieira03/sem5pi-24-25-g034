using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace sem5pi_24_25_g202.Migrations
{
    /// <inheritdoc />
    public partial class MakeSystemUserIdNullable2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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
                keyValue: new Guid("c53d5323-3c95-47d1-881c-6f15138b3e2f"));

            migrationBuilder.DeleteData(
                table: "Patients",
                keyColumn: "Id",
                keyValue: new Guid("cfb1ef44-c47c-498c-84cc-45c38e2ed8ba"));

            migrationBuilder.DeleteData(
                table: "SystemUser",
                keyColumn: "Id",
                keyValue: new Guid("77d92824-a31d-4b33-9025-874c7be4ef48"));

            migrationBuilder.DeleteData(
                table: "SystemUser",
                keyColumn: "Id",
                keyValue: new Guid("d285e26f-4cbc-496a-a0f4-441331513d72"));

            migrationBuilder.DeleteData(
                table: "SystemUser",
                keyColumn: "Id",
                keyValue: new Guid("f9e72326-136d-4e76-b9b7-bed1d2e0fcb5"));

            migrationBuilder.DropColumn(
                name: "Username",
                table: "Patients");

            migrationBuilder.AddColumn<Guid>(
                name: "SystemUserId1",
                table: "Patients",
                type: "char(36)",
                nullable: true,
                collation: "ascii_general_ci");

            migrationBuilder.InsertData(
                table: "Patients",
                columns: new[] { "Id", "AllergiesOrMedicalConditions", "AppointmentHistory", "DateOfBirth", "Email", "EmergencyContact", "FirstName", "Gender", "LastName", "MedicalRecordNumber", "PhoneNumber", "SystemUserId", "SystemUserId1" },
                values: new object[,]
                {
                    { new Guid("bd999d1c-4801-4995-bdb7-6856cbfb85a9"), "[\"Penicillin allergy\"]", "[\"Checkup on 2024-01-20\"]", new DateTime(1985, 5, 21, 0, 0, 0, 0, DateTimeKind.Unspecified), "1220741@isep.ipp.pt", "0987654321", "Bernardo", "Male", "Giao", "MRN123456", "1234567890", null, null },
                    { new Guid("ff1a420a-2bb6-472e-a447-9b37bd2390ce"), "[\"Nut allergy\"]", "[\"Vaccination on 2023-05-15\"]", new DateTime(1999, 10, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "ruimdvieir@gmail.com", "0987654322", "Rui", "Male", "Vieira", "MRN987654", "1234567891", null, null }
                });

            migrationBuilder.InsertData(
                table: "SystemUser",
                columns: new[] { "Id", "Email", "IAMId", "Password", "PhoneNumber", "ResetToken", "Role", "TokenExpiry", "Username", "VerifyToken", "isVerified" },
                values: new object[,]
                {
                    { new Guid("2b09789d-c1b7-4687-b1fb-7a5e8f58dd4a"), "doctor@hospital.com", "2", "SEM5pi1234@", "1234567891", "", 1, null, "doctorUser", "", true },
                    { new Guid("65001c25-a3d2-44f7-8267-ad0acb1e2b48"), "ruimdv13@gmail.com", "1", "SEM5pi1234@", "912028969", "", 0, null, "adminUser", "", true },
                    { new Guid("bdd040a9-e0b8-4e7b-a206-314d500604bf"), "nurse@hospital.com", "3", "SEM5pi1234@", "1234567892", "", 2, null, "nurseUser", "", true }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Patients_SystemUserId1",
                table: "Patients",
                column: "SystemUserId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Patients_SystemUser_SystemUserId1",
                table: "Patients",
                column: "SystemUserId1",
                principalTable: "SystemUser",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Patients_SystemUser_SystemUserId1",
                table: "Patients");

            migrationBuilder.DropIndex(
                name: "IX_Patients_SystemUserId1",
                table: "Patients");

            migrationBuilder.DeleteData(
                table: "Patients",
                keyColumn: "Id",
                keyValue: new Guid("bd999d1c-4801-4995-bdb7-6856cbfb85a9"));

            migrationBuilder.DeleteData(
                table: "Patients",
                keyColumn: "Id",
                keyValue: new Guid("ff1a420a-2bb6-472e-a447-9b37bd2390ce"));

            migrationBuilder.DeleteData(
                table: "SystemUser",
                keyColumn: "Id",
                keyValue: new Guid("2b09789d-c1b7-4687-b1fb-7a5e8f58dd4a"));

            migrationBuilder.DeleteData(
                table: "SystemUser",
                keyColumn: "Id",
                keyValue: new Guid("65001c25-a3d2-44f7-8267-ad0acb1e2b48"));

            migrationBuilder.DeleteData(
                table: "SystemUser",
                keyColumn: "Id",
                keyValue: new Guid("bdd040a9-e0b8-4e7b-a206-314d500604bf"));

            migrationBuilder.DropColumn(
                name: "SystemUserId1",
                table: "Patients");

            migrationBuilder.AddColumn<string>(
                name: "Username",
                table: "Patients",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.InsertData(
                table: "Patients",
                columns: new[] { "Id", "AllergiesOrMedicalConditions", "AppointmentHistory", "DateOfBirth", "Email", "EmergencyContact", "FirstName", "Gender", "LastName", "MedicalRecordNumber", "PhoneNumber", "SystemUserId", "Username" },
                values: new object[,]
                {
                    { new Guid("c53d5323-3c95-47d1-881c-6f15138b3e2f"), "[\"Nut allergy\"]", "[\"Vaccination on 2023-05-15\"]", new DateTime(1999, 10, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "ruimdvieir@gmail.com", "0987654322", "Rui", "Male", "Vieira", "MRN987654", "1234567891", null, null },
                    { new Guid("cfb1ef44-c47c-498c-84cc-45c38e2ed8ba"), "[\"Penicillin allergy\"]", "[\"Checkup on 2024-01-20\"]", new DateTime(1985, 5, 21, 0, 0, 0, 0, DateTimeKind.Unspecified), "1220741@isep.ipp.pt", "0987654321", "Bernardo", "Male", "Giao", "MRN123456", "1234567890", null, null }
                });

            migrationBuilder.InsertData(
                table: "SystemUser",
                columns: new[] { "Id", "Email", "IAMId", "Password", "PhoneNumber", "ResetToken", "Role", "TokenExpiry", "Username", "VerifyToken", "isVerified" },
                values: new object[,]
                {
                    { new Guid("77d92824-a31d-4b33-9025-874c7be4ef48"), "ruimdv13@gmail.com", "1", "SEM5pi1234@", "912028969", "", 0, null, "adminUser", "", true },
                    { new Guid("d285e26f-4cbc-496a-a0f4-441331513d72"), "nurse@hospital.com", "3", "SEM5pi1234@", "1234567892", "", 2, null, "nurseUser", "", true },
                    { new Guid("f9e72326-136d-4e76-b9b7-bed1d2e0fcb5"), "doctor@hospital.com", "2", "SEM5pi1234@", "1234567891", "", 1, null, "doctorUser", "", true }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Patients_SystemUserId",
                table: "Patients",
                column: "SystemUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Patients_SystemUser_SystemUserId",
                table: "Patients",
                column: "SystemUserId",
                principalTable: "SystemUser",
                principalColumn: "Id");
        }
    }
}
