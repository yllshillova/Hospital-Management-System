using Domain.Base;

namespace Domain.Entities
{
    public class Room : BaseEntity
    {
        public string Type { get; set; }
        public bool IsFree { get; set; }
        public Guid PatientId { get; set; }
        public Patient Patient { get; set; }
    }
}
