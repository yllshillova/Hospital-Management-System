using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configuration
{
    internal sealed class DepartmentConfiguration : IEntityTypeConfiguration<Department>
    {
        public void Configure(EntityTypeBuilder<Department> builder)
        {
            builder.ToTable("Departments", builder => builder.IsTemporal(x =>
            {
                x.HasPeriodEnd("ValidTo");
                x.HasPeriodStart("ValidFrom");
                x.UseHistoryTable("DepartmentHistoricalData");
            }));
        }
    }
}
