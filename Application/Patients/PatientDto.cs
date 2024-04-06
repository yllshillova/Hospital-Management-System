using Application.Base;

namespace Application.Patients
{
    public class PatientDto : BaseEntityDto
    {
        public string Name { get; set; }
        public string Residence { get; set; }
        public int Age { get; set; }
        //public int Weight { get; set; }
        //public int Height { get; set; }
        public string Gender { get; set; }
        public string BloodGroup { get; set; }
    }
}
