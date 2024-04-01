using System.Security.Cryptography.X509Certificates;

namespace Domain.Entities
{
    public class EmergencyContact
    {
        public Guid ContactId { get; set; }
        public string ContactName {  get; set; }
        public string Relation {  get; set; }
        public string PhoneNumber { get; set; }
        public Guid PatientId { get; set; }
        public Patient Patient { get; set; }
        
    }
}
