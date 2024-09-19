using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.EntityConfiguration
{
    internal sealed class SatelliteConfiguration : IEntityTypeConfiguration<Satellite>
    {
        public void Configure(EntityTypeBuilder<Satellite> builder)
        {
            builder.HasOne(a => a.Planet)
                   .WithMany()
                   .HasForeignKey(a => a.PlanetId)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
