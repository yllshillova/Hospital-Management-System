using Application.Base;

namespace Application.DTOs
{
    public class PrescriptionDto : BaseEntityDto
    {
        public string Medicine { get; set; }
        public string Dosage { get; set; }
        public string Frequency { get; set; }
        public string Route { get; set; }
        public string FoodRelation { get; set; }
        public List<string> DoDont { get; set; }
        public Guid PatientId { get; set; }
        public Guid DoctorId { get; set; }
    }
}
