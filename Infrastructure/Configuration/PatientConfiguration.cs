using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configuration
{
    internal sealed class PatientConfiguration : IEntityTypeConfiguration<Patient>
    {
        public void Configure(EntityTypeBuilder<Patient> builder)
        {
            builder.HasMany(x => x.Appointments)
                   .WithOne(x => x.Patient);

            builder.ToTable("Patients", builder => builder.IsTemporal(x =>
            {
                x.HasPeriodEnd("ValidTo");
                x.HasPeriodStart("ValidFrom");
                x.UseHistoryTable("PatientHistoricalData");
            }));
        }
    }
}
