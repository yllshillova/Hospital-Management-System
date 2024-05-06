using Application.Base;
using Application.Patients;

namespace Application.Rooms
{
    public class RoomDto : BaseEntityDto
    {
        public bool IsFree { get; set; }
        public int Number { get; set; }
        public int Capacity { get; set; }
        public ICollection<PatientDto> Patients { get; set; }
    }
}
