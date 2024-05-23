using Application.Base;

namespace Application.Doctors
{
    public class DoctorDto : BaseEntityDto
    {
        public string Name { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string? Residence { get; set; }
        public string? Address { get; set; }
        public string? Gender { get; set; }
        public string Email { get; set; }
        public string Specialization { get; set; }
        public DateTime? Birthday { get; set; }
        public Guid DepartmentId { get; set; }
        public string IsDeleted { get; set; }
        public string Password { get; set; }

    }
}
