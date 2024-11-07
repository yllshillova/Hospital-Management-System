using Domain.Base;

namespace Domain.Entities
{
    public class Botuesi : IEntityBase
    {
        public Guid Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public string PublisherName { get; set; }
        public string Location { get; set; }
    }
}
