using Domain.Base;

namespace Domain.Entities
{
    public class Employee : IEntityBase
    {
        public Guid Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public string FullName { get; set; }
        public bool IsActive { get; set; }
    }
}
