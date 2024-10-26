using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace sem5pi_24_25_g202.Migrations
{
    /// <inheritdoc />
    public partial class NewMigration1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ContactInformation");

            migrationBuilder.DeleteData(
                table: "SystemUser",
                keyColumn: "Id",
                keyValue: new Guid("6bfa9c6f-6156-412d-8b39-feb2e83b9542"));

            migrationBuilder.DeleteData(
                table: "SystemUser",
                keyColumn: "Id",
                keyValue: new Guid("ac80239e-cfc6-4cfa-9867-909df44e51a1"));

            migrationBuilder.DeleteData(
                table: "SystemUser",
                keyColumn: "Id",
                keyValue: new Guid("fb8f1a9c-38ab-498b-830d-67581d8be8a9"));

            migrationBuilder.AddColumn<bool>(
                name: "isVerified",
                table: "SystemUser",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.InsertData(
                table: "SystemUser",
                columns: new[] { "Id", "Email", "IAMId", "Password", "PhoneNumber", "ResetToken", "Role", "TokenExpiry", "Username", "isVerified" },
                values: new object[,]
                {
                    { new Guid("1e109e40-ca41-4353-ad3a-bacac35ef261"), "doctor@hospital.com", "2", "SEM5pi1234@", "1234567891", "", 1, null, "doctorUser", true },
                    { new Guid("4282df1c-473c-49e5-ab83-856f7a75b107"), "ruimdv13@gmail.com", "1", "SEM5pi1234@", "912028969", "", 0, null, "adminUser", true },
                    { new Guid("88f34819-97f6-49c1-b89b-1366141be83a"), "nurse@hospital.com", "3", "SEM5pi1234@", "1234567892", "", 2, null, "nurseUser", true }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "SystemUser",
                keyColumn: "Id",
                keyValue: new Guid("1e109e40-ca41-4353-ad3a-bacac35ef261"));

            migrationBuilder.DeleteData(
                table: "SystemUser",
                keyColumn: "Id",
                keyValue: new Guid("4282df1c-473c-49e5-ab83-856f7a75b107"));

            migrationBuilder.DeleteData(
                table: "SystemUser",
                keyColumn: "Id",
                keyValue: new Guid("88f34819-97f6-49c1-b89b-1366141be83a"));

            migrationBuilder.DropColumn(
                name: "isVerified",
                table: "SystemUser");

            migrationBuilder.CreateTable(
                name: "ContactInformation",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Email = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PhoneNumber = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContactInformation", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.InsertData(
                table: "ContactInformation",
                columns: new[] { "Id", "Email", "PhoneNumber" },
                values: new object[,]
                {
                    { 1, "ruimdv13@gmail.com", "912028969" },
                    { 2, "doctor@hospital.com", "1234567891" },
                    { 3, "nurse@hospital.com", "1234567892" }
                });

            migrationBuilder.InsertData(
                table: "SystemUser",
                columns: new[] { "Id", "Email", "IAMId", "Password", "PhoneNumber", "ResetToken", "Role", "TokenExpiry", "Username" },
                values: new object[,]
                {
                    { new Guid("6bfa9c6f-6156-412d-8b39-feb2e83b9542"), "ruimdv13@gmail.com", "1", "SEM5pi1234@", "912028969", "", 0, null, "adminUser" },
                    { new Guid("ac80239e-cfc6-4cfa-9867-909df44e51a1"), "nurse@hospital.com", "3", "SEM5pi1234@", "1234567892", "", 2, null, "nurseUser" },
                    { new Guid("fb8f1a9c-38ab-498b-830d-67581d8be8a9"), "doctor@hospital.com", "2", "SEM5pi1234@", "1234567891", "", 1, null, "doctorUser" }
                });
        }
    }
}
