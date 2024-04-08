using Application.Base;

namespace Application.Doctors
{
    public class DoctorDto : BaseEntityDto
    {
        public string Specialization { get; set; }
        public Guid DepartmentId { get; set; }
        public bool IsDeleted { get; set; } = false;
    }
}
