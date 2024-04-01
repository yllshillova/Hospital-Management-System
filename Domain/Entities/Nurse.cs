
using Domain.Base;

namespace Domain.Entities
{
    public class Nurse : BaseEntity
    {
        public Guid StaffId { get; set; }
        public Staff Staff { get; set; }
    }
}
