using Domain.Base;
using Domain.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace Domain.Entities
{
    public class AppUser : IdentityUser<Guid>, IPerson, IIsSoftDeletable, IEntityBase
    {
        public string Name { get; set; }
        public string LastName { get; set; }
        public string? Residence { get; set; }
        public string? Address { get; set; }
        public string? Gender { get; set; }
        //public string Department { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public DateTime? Birthday { get; set; }
        public Guid DepartmentId { get; set; }
        public Department Department { get; set; }
    }
}
