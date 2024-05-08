using Domain.Base;

namespace Domain.Entities
{
    public class Room : IEntityBase
    {
        public Guid Id { get; set; }
        public int Beds { get; set; }
        public int BedsAvailable { get; set; }
        public int RoomNumber { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public ICollection<Patient> Patients { get; set; }
        public Department Department { get; set; }
        public Guid DepartmentId { get; set; }

    }
}
