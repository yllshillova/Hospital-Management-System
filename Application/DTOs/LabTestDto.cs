using Application.Base;
using Domain.Entities;

namespace Application.DTOs
{
    public class LabTestDto : BaseEntityDto
    {
        public string Type { get; set; }
        public string Results { get; set; }
        public string Notes { get; set; }
        public Prescription Prescription { get; set; }
        public Guid PrescriptionId { get; set; }
    }
}
