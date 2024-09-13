using Domain.Base;

namespace Domain.Entities
{
    public class Member : IEntityBase
    {
        public Guid Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public string Name { get; set; }
        public string Role { get; set; }

        public Group Group { get; set; }
        public Guid GroupId { get; set; }
    }
}
