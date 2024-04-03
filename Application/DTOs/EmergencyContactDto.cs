using Application.Base;
namespace Application.DTOs
{
    public class EmergencyContactDto
    {
        public string ContactName { get; set; }
        public string Relation {  get; set; }
        public string PhoneNumber { get; set; }
        public Guid PatientId { get; set; }
    }
}
