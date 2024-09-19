using Application.Base;

namespace Application.Satellites
{
    public class SatelliteDto : BaseEntityDto
    {
        public string Name { get; set; }
        public bool IsDeleted { get; set; }
        public Guid PlanetId { get; set; }

    }
}
