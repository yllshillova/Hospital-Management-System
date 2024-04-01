using Domain.Base;

namespace Domain.Entities
{
    public class LabTest : BaseEntity
    {
        public string Type { get; set; }
        public string Results { get; set; }
        public string Notes { get; set; }
        public Guid LaboratorScientistId { get; set; }
        public LaboratoryScientist LaboratoryScientist { get; set; }
        public Guid PrescriptionId { get; set; }
        public Prescription Prescription { get; set; }
    }
}
