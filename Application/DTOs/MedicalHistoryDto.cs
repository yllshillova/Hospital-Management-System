using Application.Base;

namespace Application.DTOs
{
    public class MedicalHistoryDto : BaseEntityDto
    {
        public string AppointmentDate { get; set; }
        public string Medications { get; set; }
        public string Surgeries { get; set; }
        public string RiskFactors { get; set; }
        public Guid PatientId { get; set; }
    }
}
