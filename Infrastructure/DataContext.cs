using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Patient> Patients { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //modelBuilder.Entity<Prescription>()
            //    .HasOne(p => p.Doctor)
            //    .WithMany()
            //    .HasForeignKey(p => p.DoctorId)
            //    .OnDelete(DeleteBehavior.Restrict);

            //modelBuilder.Entity<Prescription>()
            //    .HasOne(p => p.Patient)
            //    .WithMany()
            //    .HasForeignKey(p => p.PatientId)
            //    .OnDelete(DeleteBehavior.Cascade);

            //modelBuilder.Entity<Appointment>()
            //    .HasOne(a => a.Patient)
            //    .WithMany()
            //    .HasForeignKey(a => a.PatientId)
            //    .OnDelete(DeleteBehavior.Cascade);
            //modelBuilder.Entity<Appointment>()
            //    .HasOne(a => a.Receptionist)
            //    .WithMany()
            //    .HasForeignKey(a => a.ReceptionistId)
            //    .OnDelete(DeleteBehavior.Restrict);

            //modelBuilder.Entity<Diagnosis>()
            //    .HasOne(d => d.Doctor)
            //    .WithMany()
            //    .HasForeignKey(d => d.DoctorId)
            //    .OnDelete(DeleteBehavior.Restrict);

            //modelBuilder.Entity<Diagnosis>()
            //     .HasOne(d => d.Patient)
            //     .WithMany()
            //     .HasForeignKey(d => d.PatientId)
            //     .OnDelete(DeleteBehavior.Cascade);

            //modelBuilder.Entity<Diagnosis>()
            //    .HasOne(d => d.Symptom)
            //    .WithMany()
            //    .HasForeignKey(d => d.SymptomId)
            //    .OnDelete(DeleteBehavior.Restrict);
        }

    }
}
