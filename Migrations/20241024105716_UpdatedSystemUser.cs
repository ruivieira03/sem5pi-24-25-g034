using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace sem5pi_24_25_g202.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedSystemUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "SystemUser",
                keyColumn: "Id",
                keyValue: new Guid("5fc1f233-f7f2-4fa1-909b-d9fda288a4c6"));

            migrationBuilder.DeleteData(
                table: "SystemUser",
                keyColumn: "Id",
                keyValue: new Guid("625070bf-c676-412f-a231-20a2bc64c468"));

            migrationBuilder.DeleteData(
                table: "SystemUser",
                keyColumn: "Id",
                keyValue: new Guid("68a3efb1-85dd-4b0c-9834-aae8fbf7eb97"));

            migrationBuilder.AddColumn<string>(
                name: "ResetToken",
                table: "SystemUser",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<DateTime>(
                name: "TokenExpiry",
                table: "SystemUser",
                type: "datetime(6)",
                nullable: true);

            migrationBuilder.InsertData(
                table: "SystemUser",
                columns: new[] { "Id", "Email", "IAMId", "Password", "PhoneNumber", "ResetToken", "Role", "TokenExpiry", "Username" },
                values: new object[,]
                {
                    { new Guid("1f8cbcc4-842e-4184-a726-c45516595f3a"), "doctor@hospital.com", "2", "SEM5pi1234@", "1234567891", "", 1, null, "doctorUser" },
                    { new Guid("2966d6b1-4a6c-4460-9e3e-bc39fef6ae75"), "ruimdv13@gmail.com", "1", "SEM5pi1234@", "912028969", "", 0, null, "adminUser" },
                    { new Guid("ce98c5bc-d81e-4a89-a72e-91faa5d45370"), "nurse@hospital.com", "3", "SEM5pi1234@", "1234567892", "", 2, null, "nurseUser" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "SystemUser",
                keyColumn: "Id",
                keyValue: new Guid("1f8cbcc4-842e-4184-a726-c45516595f3a"));

            migrationBuilder.DeleteData(
                table: "SystemUser",
                keyColumn: "Id",
                keyValue: new Guid("2966d6b1-4a6c-4460-9e3e-bc39fef6ae75"));

            migrationBuilder.DeleteData(
                table: "SystemUser",
                keyColumn: "Id",
                keyValue: new Guid("ce98c5bc-d81e-4a89-a72e-91faa5d45370"));

            migrationBuilder.DropColumn(
                name: "ResetToken",
                table: "SystemUser");

            migrationBuilder.DropColumn(
                name: "TokenExpiry",
                table: "SystemUser");

            migrationBuilder.InsertData(
                table: "SystemUser",
                columns: new[] { "Id", "Email", "IAMId", "Password", "PhoneNumber", "Role", "Username" },
                values: new object[,]
                {
                    { new Guid("5fc1f233-f7f2-4fa1-909b-d9fda288a4c6"), "ruimdv13@gmail.com", "1", "SEM5pi1234@", "912028969", 0, "adminUser" },
                    { new Guid("625070bf-c676-412f-a231-20a2bc64c468"), "nurse@hospital.com", "3", "SEM5pi1234@", "1234567892", 2, "nurseUser" },
                    { new Guid("68a3efb1-85dd-4b0c-9834-aae8fbf7eb97"), "doctor@hospital.com", "2", "SEM5pi1234@", "1234567891", 1, "doctorUser" }
                });
        }
    }
}
