using Application.Base;

namespace Application.Rooms
{
    public class RoomDto : BaseEntityDto
    {
        public bool IsFree { get; set; }
        public int Number { get; set;}
        public int Capacity { get; set; }
    }
}
