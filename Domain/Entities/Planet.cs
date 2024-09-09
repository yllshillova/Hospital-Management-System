using Domain.Base;
using Domain.Interfaces;

namespace Domain.Entities
{
    public class Planet : IEntityBase, IIsSoftDeletable
    {
        public Guid Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public bool IsDeleted { get; set; }
        public IEnumerable<Satellite> Satellites { get; set; }
    }
}
