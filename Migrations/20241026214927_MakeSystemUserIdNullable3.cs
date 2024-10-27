using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace sem5pi_24_25_g202.Migrations
{
    /// <inheritdoc />
    public partial class MakeSystemUserIdNullable3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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
                name: "SystemUserId",
                table: "Patients");

            migrationBuilder.DropColumn(
                name: "SystemUserId1",
                table: "Patients");

            migrationBuilder.AlterColumn<string>(
                name: "VerifyToken",
                table: "SystemUser",
                type: "longtext",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "longtext")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<string>(
                name: "ResetToken",
                table: "SystemUser",
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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.UpdateData(
                table: "SystemUser",
                keyColumn: "VerifyToken",
                keyValue: null,
                column: "VerifyToken",
                value: "");

            migrationBuilder.AlterColumn<string>(
                name: "VerifyToken",
                table: "SystemUser",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext",
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "SystemUser",
                keyColumn: "ResetToken",
                keyValue: null,
                column: "ResetToken",
                value: "");

            migrationBuilder.AlterColumn<string>(
                name: "ResetToken",
                table: "SystemUser",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext",
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<Guid>(
                name: "SystemUserId",
                table: "Patients",
                type: "char(36)",
                nullable: true,
                collation: "ascii_general_ci");

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
    }
}
