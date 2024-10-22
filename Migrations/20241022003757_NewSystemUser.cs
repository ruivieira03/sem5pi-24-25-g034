using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace sem5pi_24_25_g202.Migrations
{
    /// <inheritdoc />
    public partial class NewSystemUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_SystemUser",
                table: "SystemUser");

            migrationBuilder.DeleteData(
                table: "SystemUser",
                keyColumn: "Username",
                keyValue: "adminUser");

            migrationBuilder.DeleteData(
                table: "SystemUser",
                keyColumn: "Username",
                keyValue: "adminUser1");

            migrationBuilder.DeleteData(
                table: "SystemUser",
                keyColumn: "Username",
                keyValue: "doctorUser");

            migrationBuilder.DeleteData(
                table: "SystemUser",
                keyColumn: "Username",
                keyValue: "nurseUser");

            migrationBuilder.AddColumn<Guid>(
                name: "Id",
                table: "SystemUser",
                type: "char(36)",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                collation: "ascii_general_ci");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SystemUser",
                table: "SystemUser",
                column: "Id");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_SystemUser",
                table: "SystemUser");

            migrationBuilder.DeleteData(
                table: "SystemUser",
                keyColumn: "Id",
                keyColumnType: "char(36)",
                keyValue: new Guid("5fc1f233-f7f2-4fa1-909b-d9fda288a4c6"));

            migrationBuilder.DeleteData(
                table: "SystemUser",
                keyColumn: "Id",
                keyColumnType: "char(36)",
                keyValue: new Guid("625070bf-c676-412f-a231-20a2bc64c468"));

            migrationBuilder.DeleteData(
                table: "SystemUser",
                keyColumn: "Id",
                keyColumnType: "char(36)",
                keyValue: new Guid("68a3efb1-85dd-4b0c-9834-aae8fbf7eb97"));

            migrationBuilder.DropColumn(
                name: "Id",
                table: "SystemUser");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SystemUser",
                table: "SystemUser",
                column: "Username");

            migrationBuilder.InsertData(
                table: "SystemUser",
                columns: new[] { "Username", "Email", "IAMId", "Password", "PhoneNumber", "Role" },
                values: new object[,]
                {
                    { "adminUser", "ruimdv13@gmail.com", "1", "SEM5pi1234@", "912028969", 0 },
                    { "adminUser1", "ruimdv03@gmail.com", "4", "SEM5pi1234@", "912028969", 0 },
                    { "doctorUser", "doctor@hospital.com", "2", "SEM5pi1234@", "1234567891", 1 },
                    { "nurseUser", "nurse@hospital.com", "3", "SEM5pi1234@", "1234567892", 2 }
                });
        }
    }
}
