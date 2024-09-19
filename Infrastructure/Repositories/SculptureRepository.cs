using Domain.Contracts;
using Domain.Entities;
using Infrastructure.Base;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    internal sealed class SculptureRepository : EntityBaseRepository<Sculpture>, ISculptureRepository
    {
        private readonly DataContext _context;
        public SculptureRepository(DataContext context) : base(context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Sculpture>> GetBySculptorAsync(string? name)
        {


            var sculptures = await _context.Sculptures
                .Include(s => s.Sculptor)
                .Where(s => s.Sculptor.Name.ToLower().Contains(name.ToLower()) && !s.IsDeleted)
                .ToListAsync();

            return sculptures;
        }


    }
}
