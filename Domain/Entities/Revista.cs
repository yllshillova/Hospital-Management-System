using Domain.Base;

namespace Domain.Entities
{
    public class Revista : IEntityBase
    {
        public Guid Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public string MagazineName { get; set; }
        public int IssueNumber { get; set; }
        public Botuesi Botuesi { get; set; }
        public Guid PublisherId { get; set; }
    }
}
