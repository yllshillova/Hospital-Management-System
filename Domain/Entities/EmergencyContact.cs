using Domain.Base;

namespace Domain.Entities
{
    public class EmergencyContact : IEntityBase
    {
        public Guid Id { get; set; }
        public string ContactName { get; set; }
        public string Relation { get; set; }
        public string PhoneNumber { get; set; }
        public Guid PatientId { get; set; }
        public Patient Patient { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
