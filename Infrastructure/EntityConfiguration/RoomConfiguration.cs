using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.EntityConfiguration
{
    internal sealed class RoomConfiguration : IEntityTypeConfiguration<Room>
    {
        public void Configure(EntityTypeBuilder<Room> builder)
        {
            //builder.HasOne(x => x.Patient)
            //    .WithMany()
            //    .HasForeignKey(x => x.PatientId)
            //    .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
