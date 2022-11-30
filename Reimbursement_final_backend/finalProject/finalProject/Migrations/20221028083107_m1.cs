using Microsoft.EntityFrameworkCore.Migrations;

namespace finalProject.Migrations
{
    public partial class m1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Employees",
                columns: table => new
                {
                    id = table.Column<string>(nullable: false),
                    CurrDateTime = table.Column<string>(nullable: false),
                    email = table.Column<string>(nullable: false),
                    Date = table.Column<string>(nullable: false),
                    reim_Type = table.Column<string>(nullable: false),
                    requested_Value = table.Column<int>(nullable: false),
                    approved_Value = table.Column<int>(nullable: false),
                    currency = table.Column<string>(nullable: false),
                    requestPhase = table.Column<string>(nullable: true),
                    RecieptAttached = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employees", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    email = table.Column<string>(nullable: false),
                    password = table.Column<string>(nullable: false),
                    fullName = table.Column<string>(nullable: false),
                    panNumber = table.Column<string>(nullable: false),
                    bankName = table.Column<string>(nullable: false),
                    bankAccount = table.Column<string>(maxLength: 12, nullable: false),
                    isApprover = table.Column<bool>(nullable: false),
                    photo = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.email);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Employees");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
