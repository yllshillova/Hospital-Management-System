using Domain.Base;
using Domain.Interfaces;

namespace Domain.Entities
{
    public class Patient : IEntityBase, IPerson, IIsSoftDeletable
    {
        public Guid Id { get; set; }
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
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public bool IsDeleted { get; set; }
        public string Occupation { get; set; }
        public string? Allergies { get; set; }
        public ICollection<Appointment> Appointments { get; set; }
        public Room Room { get; set; }
        public Guid? RoomId { get; set; }
    }
}
