using Domain.Base;
using Domain.Interfaces;

namespace Domain.Entities
{
    public class Satellite : IEntityBase, IIsSoftDeletable
    {
        public Guid Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public string Name { get; set; }
        public bool IsDeleted { get; set; }
        public Planet Planet { get; set; }
        public Guid PlanetId { get; set; }
    }
}
