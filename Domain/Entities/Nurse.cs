
namespace Domain.Entities
{
    public class Nurse
    {
        public Guid Id { get; set; }
        public Guid StaffId { get; set; }
        public Staff Staff { get; set; }
        public Guid DepartmentId { get; set; }
        public Department Department { get; set; }
    }
}
