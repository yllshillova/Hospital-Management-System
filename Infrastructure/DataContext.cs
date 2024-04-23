using Domain.Entities;
using Infrastructure.EntityConfiguration;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure
{
    public class DataContext : IdentityDbContext<IdentityUser<Guid>, IdentityRole<Guid>, Guid>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Nurse> Nurses { get; set; }
        public DbSet<Patient> Patients { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<Doctor> Doctors { get; set; }
        public DbSet<Visit> Visits { get; set; }
        public DbSet<EmergencyContact> EmergencyContacts { get; set; }
        public DbSet<Appointment> Appointments { get; set; }
        public DbSet<RoomPatient> RoomPatients { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfiguration(new AppointmentConfiguration());
            modelBuilder.ApplyConfiguration(new DepartmentConfiguration());
            modelBuilder.ApplyConfiguration(new DoctorConfiguration());
            modelBuilder.ApplyConfiguration(new EmergencyContactConfiguration());
            modelBuilder.ApplyConfiguration(new NurseConfiguration());
            modelBuilder.ApplyConfiguration(new PatientConfiguration());
            //modelBuilder.ApplyConfiguration(new RoomConfiguration());
            modelBuilder.ApplyConfiguration(new VisitConfiguration());

        }

    }
}
