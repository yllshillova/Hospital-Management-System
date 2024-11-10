using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedNurseTableToNurses : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Nurse_AspNetUsers_Id",
                table: "Nurse");

            migrationBuilder.DropForeignKey(
                name: "FK_Nurse_Department_DepartmentId",
                table: "Nurse");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Nurse",
                table: "Nurse");

            migrationBuilder.RenameTable(
                name: "Nurse",
                newName: "Nurses");

            migrationBuilder.RenameIndex(
                name: "IX_Nurse_DepartmentId",
                table: "Nurses",
                newName: "IX_Nurses_DepartmentId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Nurses",
                table: "Nurses",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Nurses_AspNetUsers_Id",
                table: "Nurses",
                column: "Id",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Nurses_Department_DepartmentId",
                table: "Nurses",
                column: "DepartmentId",
                principalTable: "Department",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Nurses_AspNetUsers_Id",
                table: "Nurses");

            migrationBuilder.DropForeignKey(
                name: "FK_Nurses_Department_DepartmentId",
                table: "Nurses");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Nurses",
                table: "Nurses");

            migrationBuilder.RenameTable(
                name: "Nurses",
                newName: "Nurse");

            migrationBuilder.RenameIndex(
                name: "IX_Nurses_DepartmentId",
                table: "Nurse",
                newName: "IX_Nurse_DepartmentId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Nurse",
                table: "Nurse",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Nurse_AspNetUsers_Id",
                table: "Nurse",
                column: "Id",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Nurse_Department_DepartmentId",
                table: "Nurse",
                column: "DepartmentId",
                principalTable: "Department",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
