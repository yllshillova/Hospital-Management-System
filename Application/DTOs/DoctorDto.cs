using Application.Base;

namespace Application.DTOs
{
    public class DoctorDto : BaseEntityDto  
    {
        public string Specialization { get; set; }
        public string Qualifications { get; set; }
        public Guid StaffId { get; set; }
    }
}
