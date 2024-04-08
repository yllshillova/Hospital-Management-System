using Application.Base;
using Domain.Entities;

namespace Application.Visits
{
    public class VisitDto : BaseEntityDto
    {
        public string Complaints { get; set; }
        public string Examinations { get; set; }
        public string Diagnosis { get; set; }
        public string Therapy { get; set; }
        public string RequiredAnalysis { get; set; }
        public string Advice { get; set; }
        public string Remarks { get; set; }
        public Guid PatientId { get; set; }
        public Guid DoctorId { get; set; }
    }
}
