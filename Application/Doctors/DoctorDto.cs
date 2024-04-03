using Application.Base;

namespace Application.Doctors
{
    public class DoctorDto : BaseEntityDto
    {
        public string Specialization { get; set; }
        public string Qualifications { get; set; }
        public Guid StaffId { get; set; }
    }
}
