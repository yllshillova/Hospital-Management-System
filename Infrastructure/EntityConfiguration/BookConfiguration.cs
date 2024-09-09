using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.EntityConfiguration
{
    internal sealed class BookConfiguration : IEntityTypeConfiguration<Book>
    {
        public void Configure(EntityTypeBuilder<Book> builder)
        {
            builder.HasOne(a => a.Author)
                   .WithMany()
                   .HasForeignKey(a => a.AuthorId)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
