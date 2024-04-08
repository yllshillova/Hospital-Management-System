using Application.Base;
namespace Application.EmergencyContacts
{
    public class EmergencyContactDto : BaseEntityDto
    {
        public string ContactName { get; set; }
        public string Relation { get; set; }
        public string PhoneNumber { get; set; }
        public Guid PatientId { get; set; }
    }
}
