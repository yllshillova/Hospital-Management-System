using Domain.Base;
using Domain.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace Domain.Entities
{
    public class Patient : IdentityUser<Guid>,IsSoftDeletable
    {
        public string Name { get; set; }
        public string Residence { get; set; }
        public int Age { get; set; }
        public string Gender { get; set; }
        public string? BloodGroup { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public bool IsDeleted { get; set; }

        //public string Habit { get; set; }
        //public string ChronicDisaesest { get; set; }
        //public string Allergies { get; set; }
        // public decimal Weight { get; set; }
        //public decimal Height { get; set; }
    }
}
