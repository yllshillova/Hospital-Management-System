using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class MedicalHistory
    {
        public Guid Id { get; set; }
        public string Type { get; set; }
        public string Category { get; set; }
        public string ICD10 { get; set; }
        public string Remarks { get; set;}
        public int PatientId { get; set; }
        public Patient Patient { get; set; }

    }
}
