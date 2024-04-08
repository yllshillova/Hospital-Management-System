using Domain.Base;
using Domain.Interfaces;

namespace Domain.Entities
{
    public class Department : IEntityBase, IIsSoftDeletable
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public bool IsDeleted {get; set; }
    }
}
