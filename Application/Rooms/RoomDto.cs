using Application.Base;

namespace Application.Rooms
{
    public class RoomDto : BaseEntityDto
    {
        public bool IsFree { get; set; }
        public int NrDhomes { get; set;}
        public int Capacity { get; set; }
    }
}
