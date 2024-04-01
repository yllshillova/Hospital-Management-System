using Domain.Base;

namespace Domain.Entities
{
    public class MedicalHistory : BaseEntity
    {
        public string AppointmentDate { get; set; }
        public string Medications { get; set; }
        public string Surgeries { get; set; }
        public string RiskFactors { get; set;}
        public Guid PatientId { get; set; }
        public Patient Patient { get; set; }
    }
}
