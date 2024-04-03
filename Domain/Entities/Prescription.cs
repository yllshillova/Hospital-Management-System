using Domain.Base;

namespace Domain.Entities
{
    public class Prescription : BaseEntity
    {
        public string Medicine { get; set; }
        public string Dosage { get; set; }
        public string Frequency { get; set; }
        public string Duration { get; set; }
        public string Route { get; set; }
        public string FoodRelation { get; set; }
        public IEnumerable<string> DoDont { get; set; }
        public Patient Patient { get; set; }
        public Guid PatientId { get; set; }
        public Doctor Doctor { get; set; }
        public Guid DoctorId { get; set; }
    }
}
