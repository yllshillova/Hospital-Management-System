using Domain.Base;

namespace Domain.Entities
{
    public class Room : IEntityBase
    {
        public Guid Id { get; set; }
        public int Capacity { get; set; }
        public bool IsFree { get; set; }
        public Guid PatientId { get; set; }
        public Patient Patient { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
