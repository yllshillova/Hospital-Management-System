
using Domain.Base;
using Domain.Interfaces;

namespace Domain.Entities
{
    public class Nurse : BaseEntity, IsSoftDeletable
    {
        public Guid StaffId { get; set; }
        public Staff Staff { get; set; }
        public bool IsDeleted { get; set; }

    }
}
