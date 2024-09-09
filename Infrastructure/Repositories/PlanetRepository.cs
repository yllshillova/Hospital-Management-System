using Domain.Contracts;
using Domain.Entities;
using Infrastructure.Base;

namespace Infrastructure.Repositories
{
    internal sealed class PlanetRepository : EntityBaseRepository<Planet>, IPlanetRepository
    {
        private readonly DataContext _context;
        public PlanetRepository(DataContext context) : base(context)
        {
            _context = context;
        }
    }
}
