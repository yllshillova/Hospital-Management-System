using Domain.Base;

namespace Domain.Entities
{
    public class Patient : BaseEntity
    {
        public string Name { get; set; }
        public string Residence { get; set; }
        public int Age { get; set; }
       // public decimal Weight { get; set; }
       //public decimal Height { get; set; }
        public string Gender { get; set; }
        public string? BloodGroup { get; set; }
        //public string Habit { get; set; }
        //public string ChronicDisaesest { get; set; }
        //public string Allergies { get; set; }
    }
}
