using Application.Base;

namespace Application.Nurses
{
    public class NurseDto : BaseEntityDto
    {
        public string Name { get; set; }
        public string LastName { get; set; }
        public string? Residence { get; set; }
        public string? Address { get; set; }
        public string? Gender { get; set; }
        public string Email { get; set; }
        public string IsDeleted { get; set; }
        public DateTime? Birthday { get; set; }
        public Guid DepartmentId { get; set; }
    }
}
