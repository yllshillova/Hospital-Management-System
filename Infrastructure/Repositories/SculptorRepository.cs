using Domain.Contracts;
using Domain.Entities;
using Infrastructure.Base;

namespace Infrastructure.Repositories
{
    internal sealed class SculptorRepository : EntityBaseRepository<Sculptor>, ISculptorRepository
    {
        private readonly DataContext _context;
        public SculptorRepository(DataContext context) : base(context)
        {
            _context = context;
        }
    }
}
