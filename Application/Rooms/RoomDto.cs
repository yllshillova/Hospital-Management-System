using Application.Base;

namespace Application.Rooms
{
    public class RoomDto : BaseEntityDto
    {
        public string Type { get; set; }
        public bool IsFree { get; set; }
        public Guid PatientId { get; set; }
    }
}
