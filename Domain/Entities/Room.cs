

namespace Domain.Entities
{
    public class Room
    {
        public Guid Id { get; set; }
        public string Type { get; set; }
        public bool IsFree { get; set; }
        public Guid PatientId { get; set; }
        public Patient Patient { get; set; }

    }
}
