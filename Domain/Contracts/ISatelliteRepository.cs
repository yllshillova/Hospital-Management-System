using Domain.Base;
using Domain.Entities;

namespace Domain.Contracts
{
    public interface ISatelliteRepository : IEntityBaseRepository<Satellite>
    {
        Task<IEnumerable<Satellite>> GetSatellitesByPlanetNameAsync(string planetName);
    }
}
