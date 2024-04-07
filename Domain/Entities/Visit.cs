using Domain.Base;

namespace Domain.Entities
{
    public class Visit : IEntityBase
    {
        public Guid Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public string Complaints { get; set; }
        public string Examinations { get; set; }
        public string Diagnosis { get; set; }
        public string Therapy { get; set; }
        public string RequiredAnalysis { get; set; }
        public string Advice { get; set; }
        public string Remarks { get; set; }
        public Patient Patient { get; set; }
        public Guid PatientId { get; set; }
        public Doctor Doctor { get; set; }
        public Guid DoctorId { get; set; }
       
    }
}
