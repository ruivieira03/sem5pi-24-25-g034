using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace sem5pi_24_25_g202.Migrations
{
    /// <inheritdoc />
    public partial class MakeSystemUserIdNullable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "SystemUser",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    Username = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Role = table.Column<int>(type: "int", nullable: false),
                    Email = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PhoneNumber = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Password = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IAMId = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ResetToken = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    isVerified = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    VerifyToken = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    TokenExpiry = table.Column<DateTime>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SystemUser", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Patients",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    FirstName = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    LastName = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    DateOfBirth = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Gender = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    MedicalRecordNumber = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Email = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PhoneNumber = table.Column<string>(type: "varchar(15)", maxLength: 15, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    AllergiesOrMedicalConditions = table.Column<string>(type: "varchar(500)", maxLength: 500, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    EmergencyContact = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    AppointmentHistory = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Username = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    SystemUserId = table.Column<Guid>(type: "char(36)", nullable: true, collation: "ascii_general_ci")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Patients", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Patients_SystemUser_SystemUserId",
                        column: x => x.SystemUserId,
                        principalTable: "SystemUser",
                        principalColumn: "Id");
                })
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
                name: "IX_Patients_Email_PhoneNumber",
                table: "Patients",
                columns: new[] { "Email", "PhoneNumber" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Patients_SystemUserId",
                table: "Patients",
                column: "SystemUserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Patients");

            migrationBuilder.DropTable(
                name: "SystemUser");
        }
    }
}
