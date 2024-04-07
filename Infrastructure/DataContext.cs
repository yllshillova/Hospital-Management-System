using Domain.Entities;
using Infrastructure.Configuration;
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
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfiguration(new AppointmentConfiguration());
            modelBuilder.ApplyConfiguration(new DepartmentConfiguration());
            modelBuilder.ApplyConfiguration(new DoctorConfiguration());
            modelBuilder.ApplyConfiguration(new EmergencyContactConfiguration());
            modelBuilder.ApplyConfiguration(new NurseConfiguration());
            modelBuilder.ApplyConfiguration(new PatientConfiguration());
            modelBuilder.ApplyConfiguration(new RoomConfiguration());
            modelBuilder.ApplyConfiguration(new VisitConfiguration());


            //modelBuilder.Entity<Appointment>()
            //    .HasOne(x => x.Patient)
            //    .WithMany()
            //    .HasForeignKey(x => x.PatientId)
            //    .OnDelete(DeleteBehavior.NoAction);

            //modelBuilder.Entity<Appointment>()
            //    .HasOne(x => x.Doctor)
            //    .WithMany()
            //    .HasForeignKey(d => d.DoctorId)
            //    .OnDelete(DeleteBehavior.NoAction);

            //modelBuilder.Entity<Visit>()
            //   .HasOne(x => x.Patient)
            //   .WithMany()
            //   .HasForeignKey(x => x.PatientId)
            //   .OnDelete(DeleteBehavior.NoAction);

            //modelBuilder.Entity<Visit>()
            //    .HasOne(x => x.Doctor)
            //    .WithMany()
            //    .HasForeignKey(d => d.DoctorId)
            //    .OnDelete(DeleteBehavior.NoAction);

            //modelBuilder.Entity<Doctor>()
            //    .HasOne(x => x.Staff)
            //    .WithMany()
            //    .HasForeignKey(d => d.StaffId)
            //    .OnDelete(DeleteBehavior.NoAction);

            //modelBuilder.Entity<Nurse>()
            //    .HasOne(x => x.Staff)
            //    .WithMany()
            //    .HasForeignKey(n => n.StaffId)
            //    .OnDelete(DeleteBehavior.NoAction);

         
        }

    }
}
