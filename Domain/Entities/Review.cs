using Domain.Base;

namespace Domain.Entities
{
    public class Review : IEntityBase
    {
        public Guid Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public string UserName { get; set; }
        public double Rating { get; set; }
        public Movie Movie { get; set; }
        public Guid MovieId { get; set; }
    }
}
