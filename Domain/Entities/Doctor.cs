using Domain.Base;
using Domain.Interfaces;

namespace Domain.Entities
{
    public class Doctor :BaseEntity, IsSoftDeletable
    {
        public string Specialization { get; set; }
        public string Qualifications { get; set; }
        public Guid StaffId { get; set; }
        public Staff Staff { get; set; }
        public bool IsDeleted { get; set; }

    }
}
