using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class RevistaBotuesi : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Botuesit",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PublisherName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Location = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Botuesit", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Revistat",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    MagazineName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IssueNumber = table.Column<int>(type: "int", nullable: false),
                    BotuesiId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    PublisherId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Revistat", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Revistat_Botuesit_BotuesiId",
                        column: x => x.BotuesiId,
                        principalTable: "Botuesit",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Revistat_BotuesiId",
                table: "Revistat",
                column: "BotuesiId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Revistat");

            migrationBuilder.DropTable(
                name: "Botuesit");
        }
    }
}
