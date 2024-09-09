using Application.Base;

namespace Application.Renovations
{
    public class RenovationDto : BaseEntityDto
    {
        public string Description { get; set; }
        public double Cost { get; set; }
        public Guid BuildingID { get; set; }

    }
}
