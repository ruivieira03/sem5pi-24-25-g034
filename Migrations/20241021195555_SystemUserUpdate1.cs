using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace sem5pi_24_25_g202.Migrations
{
    /// <inheritdoc />
    public partial class SystemUserUpdate1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "SystemUser",
                columns: new[] { "Username", "Email", "IAMId", "Password", "PhoneNumber", "Role" },
                values: new object[] { "adminUser1", "ruimdv03@gmail.com", "4", "SEM5pi1234@", "912028969", 0 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "SystemUser",
                keyColumn: "Username",
                keyValue: "adminUser1");
        }
    }
}
