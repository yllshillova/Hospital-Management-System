using Application.Base;
using Domain.Entities;

namespace Application.Patients
{
    public class PatientDto : BaseEntityDto
    {
        public string Name { get; set; }
        public string LastName { get; set; }
        public string ParentName { get; set; }
        public string PersonalNumber { get; set; }
        public string Address { get; set; }
        public string Residence { get; set; }
        public DateTime? Birthday { get; set; }
        public string? BloodGroup { get; set; }
        public string Gender { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Occupation { get; set; }
        public string? Allergies { get; set; }
        public string IsDeleted { get; set; }
        public ICollection<Appointment> Appointments { get; set; }
    }
}
