using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedRenovationTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Renovations_Buildings_BuidlingID",
                table: "Renovations");

            migrationBuilder.RenameColumn(
                name: "BuidlingID",
                table: "Renovations",
                newName: "BuildingID");

            migrationBuilder.RenameIndex(
                name: "IX_Renovations_BuidlingID",
                table: "Renovations",
                newName: "IX_Renovations_BuildingID");

            migrationBuilder.AddForeignKey(
                name: "FK_Renovations_Buildings_BuildingID",
                table: "Renovations",
                column: "BuildingID",
                principalTable: "Buildings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Renovations_Buildings_BuildingID",
                table: "Renovations");

            migrationBuilder.RenameColumn(
                name: "BuildingID",
                table: "Renovations",
                newName: "BuidlingID");

            migrationBuilder.RenameIndex(
                name: "IX_Renovations_BuildingID",
                table: "Renovations",
                newName: "IX_Renovations_BuidlingID");

            migrationBuilder.AddForeignKey(
                name: "FK_Renovations_Buildings_BuidlingID",
                table: "Renovations",
                column: "BuidlingID",
                principalTable: "Buildings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
