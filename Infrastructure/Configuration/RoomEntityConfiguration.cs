using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configuration
{
    internal class RoomEntityConfiguration : IEntityTypeConfiguration<Room>
    {
        public void Configure(EntityTypeBuilder<Room> builder)
        {
            builder.HasOne<Patient>(p => p.Patient)
                   .WithMany()
                   .HasForeignKey(p => p.PatientId)
                   .OnDelete(DeleteBehavior.Cascade);  
        }
    }
}
