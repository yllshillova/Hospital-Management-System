using Application.Base;
using Application.Satellites;

namespace Application.Planets
{
    public class PlanetDto : BaseEntityDto
    {
        public string Name { get; set; }
        public string Type { get; set; }
        public bool IsDeleted { get; set; }
        public IEnumerable<SatelliteDto> Satellites { get; set; }


    }
}
