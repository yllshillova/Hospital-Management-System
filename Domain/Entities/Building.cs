using Domain.Base;

namespace Domain.Entities
{
    public class Building : IEntityBase
    {
        public Guid Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }

    }
}
