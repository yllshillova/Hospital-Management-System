using Domain.Base;

namespace Domain.Entities
{
    public class Doctor :BaseEntity
    {
        public string Specialization { get; set; }
        public string Qualifications { get; set; }
        public Guid StaffId { get; set; }
        public Staff Staff { get; set; }

    }
}
