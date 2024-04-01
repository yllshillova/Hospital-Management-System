

namespace Domain.Entities
{
    public class LabTest
    {
        public Guid Id { get; set; }
        public string Type { get; set; }
        public string Results { get; set; }
        public string Notes { get; set; }
        public Guid LaboratorScientistId { get; set; }
        public LaboratoryScientist LaboratoryScientist { get; set; }
        public Guid PrescriptionId { get; set; }
        public Prescription Prescription { get; set; }
    }
}
