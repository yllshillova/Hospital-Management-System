﻿

namespace Domain.Entities
{
    public class LabTest
    {
        public Guid Id { get; set; }
        public String Type { get; set; }
        public String Results { get; set; }
        public String Notes { get; set; }
        public Guid LaboratorScientistId { get; set; }
        public LaboratoryScientist laboratoryScientist { get; set; }
    }
}
