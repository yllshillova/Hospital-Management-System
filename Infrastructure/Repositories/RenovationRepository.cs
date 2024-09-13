using Domain.Contracts;
using Domain.Entities;
using Infrastructure.Base;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    internal sealed class RenovationRepository : EntityBaseRepository<Renovation>, IRenovationRepository
    {
        private readonly DataContext _context;
        public RenovationRepository(DataContext context) : base(context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Renovation>> GetByLocationAsync(string location)
        {
            var renovations = await _context.Renovations.Include(r => r.Building)
                .Where(r => r.Building.Location == location).ToListAsync();
            return renovations;
        }

    }
}
