using Domain.Contracts;
using Domain.Entities;
using Infrastructure.Base;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    internal sealed class SatelliteRepository : EntityBaseRepository<Satellite>, ISatelliteRepository
    {
        private readonly DataContext _context;
        public SatelliteRepository(DataContext context) : base(context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Satellite>> GetSatellitesByPlanetNameAsync(string planetName)
        {
            var satellites = await _context.Satellites.Where(s => s.Planet.Name == planetName && s.IsDeleted == false)
                .AsNoTracking()
                .ToListAsync();
            return satellites;
        }

    }
}
