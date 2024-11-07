using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace sem5pi_24_25_g202.Migrations
{
    /// <inheritdoc />
    public partial class CreateOperationRequestTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Patients",
                keyColumn: "Id",
                keyValue: new Guid("49dec36c-458c-4a7c-a65f-cb3ba6abf126"));

            migrationBuilder.DeleteData(
                table: "Patients",
                keyColumn: "Id",
                keyValue: new Guid("f86bd938-3afd-4cb9-a4c3-b1c55b7d9e5c"));

            migrationBuilder.DeleteData(
                table: "SystemUser",
                keyColumn: "Id",
                keyValue: new Guid("43763415-39dc-40e0-8bf0-a5d72cdb63af"));

            migrationBuilder.DeleteData(
                table: "SystemUser",
                keyColumn: "Id",
                keyValue: new Guid("885f0e46-7815-4861-8c2a-597bb406abb6"));

            migrationBuilder.DeleteData(
                table: "SystemUser",
                keyColumn: "Id",
                keyValue: new Guid("949e3921-11f8-418e-9aba-dcf00ff3d875"));

            migrationBuilder.CreateTable(
                name: "OperationRequest",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    PatientID = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    DoctorID = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    OperationTypeID = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    DeadlineDate = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Priority = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OperationRequest", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.InsertData(
                table: "OperationRequest",
                columns: new[] { "Id", "DeadlineDate", "DoctorID", "OperationTypeID", "PatientID", "Priority" },
                values: new object[,]
                {
                    { new Guid("61cad2b0-b0fa-483c-8405-94fd29b4165b"), new DateTime(2022, 12, 31, 0, 0, 0, 0, DateTimeKind.Unspecified), new Guid("6ecfba67-afc7-4f42-aa69-e3b581265768"), "3", new Guid("72dbe0aa-47f4-4f0d-9982-8895bf670c7a"), 3 },
                    { new Guid("849f95a0-47b8-40d3-b125-94af20f33991"), new DateTime(2022, 12, 31, 0, 0, 0, 0, DateTimeKind.Unspecified), new Guid("18cc1478-2d22-4015-8c76-583bedf92daf"), "2", new Guid("687d019f-45f3-4868-bfc2-7e4a0e2d93ca"), 2 },
                    { new Guid("bec90ef3-cace-48b3-98ce-035d7cac6e95"), new DateTime(2022, 12, 31, 0, 0, 0, 0, DateTimeKind.Unspecified), new Guid("cf04c5c0-cf11-4aa7-ad6e-f187b6c195fc"), "1", new Guid("cc0aab86-38bf-4878-b837-94cb4d826ad5"), 1 }
                });

            migrationBuilder.InsertData(
                table: "Patients",
                columns: new[] { "Id", "AllergiesOrMedicalConditions", "AppointmentHistory", "DateOfBirth", "Email", "EmergencyContact", "FirstName", "Gender", "LastName", "MedicalRecordNumber", "PhoneNumber" },
                values: new object[,]
                {
                    { new Guid("7c2c2273-2f16-4788-bc43-f289bcecc55a"), "[\"Nut allergy\"]", "[\"Vaccination on 2023-05-15\"]", new DateTime(1999, 10, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "ruimdvieir@gmail.com", "0987654322", "Rui", "Male", "Vieira", "MRN987654", "1234567891" },
                    { new Guid("bd56ebb2-858b-4ecb-bb74-4040272f10e9"), "[\"Penicillin allergy\"]", "[\"Checkup on 2024-01-20\"]", new DateTime(1985, 5, 21, 0, 0, 0, 0, DateTimeKind.Unspecified), "1220741@isep.ipp.pt", "0987654321", "Bernardo", "Male", "Giao", "MRN123456", "1234567890" }
                });

            migrationBuilder.InsertData(
                table: "SystemUser",
                columns: new[] { "Id", "DeleteToken", "Email", "IAMId", "Password", "PatientId", "PhoneNumber", "ResetToken", "Role", "TokenExpiry", "Username", "VerifyToken", "isVerified" },
                values: new object[,]
                {
                    { new Guid("ae7f6539-eeed-4837-90cc-f94bac7de311"), null, "ruimdv13@gmail.com", "1", "bf32388f0f958a12428ebc237a8d0863265e795ceb5c5f3d013b062f75bfad9e", null, "912028969", null, 0, null, "adminUser", null, true },
                    { new Guid("c6d257c8-a04e-4b88-a216-8d8f7a3ef7be"), null, "doctor@hospital.com", "2", "bf32388f0f958a12428ebc237a8d0863265e795ceb5c5f3d013b062f75bfad9e", null, "1234567891", null, 1, null, "doctorUser", null, true },
                    { new Guid("cb029ee8-8796-46a3-8aeb-0be008bb51ac"), null, "nurse@hospital.com", "3", "bf32388f0f958a12428ebc237a8d0863265e795ceb5c5f3d013b062f75bfad9e", null, "1234567892", null, 2, null, "nurseUser", null, true }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OperationRequest");

            migrationBuilder.DeleteData(
                table: "Patients",
                keyColumn: "Id",
                keyValue: new Guid("7c2c2273-2f16-4788-bc43-f289bcecc55a"));

            migrationBuilder.DeleteData(
                table: "Patients",
                keyColumn: "Id",
                keyValue: new Guid("bd56ebb2-858b-4ecb-bb74-4040272f10e9"));

            migrationBuilder.DeleteData(
                table: "SystemUser",
                keyColumn: "Id",
                keyValue: new Guid("ae7f6539-eeed-4837-90cc-f94bac7de311"));

            migrationBuilder.DeleteData(
                table: "SystemUser",
                keyColumn: "Id",
                keyValue: new Guid("c6d257c8-a04e-4b88-a216-8d8f7a3ef7be"));

            migrationBuilder.DeleteData(
                table: "SystemUser",
                keyColumn: "Id",
                keyValue: new Guid("cb029ee8-8796-46a3-8aeb-0be008bb51ac"));

            migrationBuilder.InsertData(
                table: "Patients",
                columns: new[] { "Id", "AllergiesOrMedicalConditions", "AppointmentHistory", "DateOfBirth", "Email", "EmergencyContact", "FirstName", "Gender", "LastName", "MedicalRecordNumber", "PhoneNumber" },
                values: new object[,]
                {
                    { new Guid("49dec36c-458c-4a7c-a65f-cb3ba6abf126"), "[\"Penicillin allergy\"]", "[\"Checkup on 2024-01-20\"]", new DateTime(1985, 5, 21, 0, 0, 0, 0, DateTimeKind.Unspecified), "1220741@isep.ipp.pt", "0987654321", "Bernardo", "Male", "Giao", "MRN123456", "1234567890" },
                    { new Guid("f86bd938-3afd-4cb9-a4c3-b1c55b7d9e5c"), "[\"Nut allergy\"]", "[\"Vaccination on 2023-05-15\"]", new DateTime(1999, 10, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "ruimdvieir@gmail.com", "0987654322", "Rui", "Male", "Vieira", "MRN987654", "1234567891" }
                });

            migrationBuilder.InsertData(
                table: "SystemUser",
                columns: new[] { "Id", "DeleteToken", "Email", "IAMId", "Password", "PatientId", "PhoneNumber", "ResetToken", "Role", "TokenExpiry", "Username", "VerifyToken", "isVerified" },
                values: new object[,]
                {
                    { new Guid("43763415-39dc-40e0-8bf0-a5d72cdb63af"), null, "ruimdv13@gmail.com", "1", "bf32388f0f958a12428ebc237a8d0863265e795ceb5c5f3d013b062f75bfad9e", null, "912028969", null, 0, null, "adminUser", null, true },
                    { new Guid("885f0e46-7815-4861-8c2a-597bb406abb6"), null, "doctor@hospital.com", "2", "bf32388f0f958a12428ebc237a8d0863265e795ceb5c5f3d013b062f75bfad9e", null, "1234567891", null, 1, null, "doctorUser", null, true },
                    { new Guid("949e3921-11f8-418e-9aba-dcf00ff3d875"), null, "nurse@hospital.com", "3", "bf32388f0f958a12428ebc237a8d0863265e795ceb5c5f3d013b062f75bfad9e", null, "1234567892", null, 2, null, "nurseUser", null, true }
                });
        }
    }
}
