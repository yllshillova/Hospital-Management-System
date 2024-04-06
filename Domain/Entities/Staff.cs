using Microsoft.AspNetCore.Identity;

namespace Domain.Entities
{
    public class Staff : IdentityUser<Guid>
    {
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Type { get; set; }
        public DateTime DateJoined { get; set; }
        public string Residence { get; set; }
        public string Address { get; set; }
        public string Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public Department Department { get; set; }
        public Guid DepartmentId { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
