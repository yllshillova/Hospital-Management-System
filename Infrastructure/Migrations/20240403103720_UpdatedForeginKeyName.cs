using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedForeginKeyName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LaboratoryScientists_Staff_StaffId",
                table: "LaboratoryScientists");

            migrationBuilder.DropColumn(
                name: "StafId",
                table: "LaboratoryScientists");

            migrationBuilder.AlterColumn<Guid>(
                name: "StaffId",
                table: "LaboratoryScientists",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_LaboratoryScientists_Staff_StaffId",
                table: "LaboratoryScientists",
                column: "StaffId",
                principalTable: "Staff",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LaboratoryScientists_Staff_StaffId",
                table: "LaboratoryScientists");

            migrationBuilder.AlterColumn<Guid>(
                name: "StaffId",
                table: "LaboratoryScientists",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddColumn<Guid>(
                name: "StafId",
                table: "LaboratoryScientists",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddForeignKey(
                name: "FK_LaboratoryScientists_Staff_StaffId",
                table: "LaboratoryScientists",
                column: "StaffId",
                principalTable: "Staff",
                principalColumn: "Id");
        }
    }
}
