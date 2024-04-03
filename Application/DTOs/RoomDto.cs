using Application.Base;

namespace Application.DTOs
{
    public class RoomDto : BaseEntityDto
    {
        public string Type { get; set; }
        public bool IsFree { get; set; }
        public Guid PatientId { get; set; }
    }
}
