using Domain.Base;
using Domain.Interfaces;

namespace Domain.Entities
{
    public class Sculpture : IEntityBase, IIsSoftDeletable
    {
        public Guid Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public string Title { get; set; }
        public string Material { get; set; }

        public bool IsDeleted { get; set; }
        public Sculptor Sculptor { get; set; }
        public Guid SculptorId { get; set; }
    }
}
