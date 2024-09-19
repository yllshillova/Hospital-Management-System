using Domain.Base;

namespace Domain.Entities
{
    public class Movie : IEntityBase
    {
        public Guid Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public string Title { get; set; }
        public string Genre { get; set; }
    }
}
