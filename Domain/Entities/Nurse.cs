namespace Domain.Entities
{
    public class Nurse : AppUser
    {
        public Guid DepartmentId { get; set; }
        public Department Department { get; set; }
    }
}
