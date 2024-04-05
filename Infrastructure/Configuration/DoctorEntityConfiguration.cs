using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configuration
{
    internal class DoctorEntityConfiguration : IEntityTypeConfiguration<Doctor>
    {
        public void Configure(EntityTypeBuilder<Doctor> builder)
        {
            builder.HasOne(x => x.Staff)
                   .WithMany()
                   .HasForeignKey(x => x.StaffId)
                   .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
