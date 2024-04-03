using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddedSomeAttributesAndValidation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Email",
                table: "Staff");

            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                table: "Staff");

            migrationBuilder.DropColumn(
                name: "PrescriptionId",
                table: "Prescriptions");

            migrationBuilder.DropColumn(
                name: "Height",
                table: "Patients");

            migrationBuilder.DropColumn(
                name: "Weight",
                table: "Patients");

            migrationBuilder.RenameColumn(
                name: "Calendar",
                table: "Appointments",
                newName: "CheckOutDate");

            migrationBuilder.AddColumn<string>(
                name: "Duration",
                table: "Prescriptions",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "StafId",
                table: "LaboratoryScientists",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "StaffId",
                table: "LaboratoryScientists",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CheckInDate",
                table: "Appointments",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateIndex(
                name: "IX_LaboratoryScientists_StaffId",
                table: "LaboratoryScientists",
                column: "StaffId");

            migrationBuilder.AddForeignKey(
                name: "FK_LaboratoryScientists_Staff_StaffId",
                table: "LaboratoryScientists",
                column: "StaffId",
                principalTable: "Staff",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LaboratoryScientists_Staff_StaffId",
                table: "LaboratoryScientists");

            migrationBuilder.DropIndex(
                name: "IX_LaboratoryScientists_StaffId",
                table: "LaboratoryScientists");

            migrationBuilder.DropColumn(
                name: "Duration",
                table: "Prescriptions");

            migrationBuilder.DropColumn(
                name: "StafId",
                table: "LaboratoryScientists");

            migrationBuilder.DropColumn(
                name: "StaffId",
                table: "LaboratoryScientists");

            migrationBuilder.DropColumn(
                name: "CheckInDate",
                table: "Appointments");

            migrationBuilder.RenameColumn(
                name: "CheckOutDate",
                table: "Appointments",
                newName: "Calendar");

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Staff",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                table: "Staff",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "PrescriptionId",
                table: "Prescriptions",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<int>(
                name: "Height",
                table: "Patients",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Weight",
                table: "Patients",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
