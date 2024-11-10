using Application.Base;
using Application.Patients;

namespace Application.Rooms
{
    public class RoomDto : BaseEntityDto
    {
        //public bool IsFree { get; set; }
        public int RoomNumber { get; set; }
        public int Beds { get; set; }
        public int BedsAvailable { get; set; }
        public Guid DepartmentId { get; set; }
        public ICollection<PatientDto> Patients { get; set; }
    }
}
