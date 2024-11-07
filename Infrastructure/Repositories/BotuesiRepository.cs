using Domain.Contracts;
using Domain.Entities;
using Infrastructure.Base;

namespace Infrastructure.Repositories
{
    internal sealed class BotuesiRepository : EntityBaseRepository<Botuesi>, IBotuesiRepository
    {
        private readonly DataContext _context;
        public BotuesiRepository(DataContext context) : base(context)
        {
            _context = context;
        }
    }
}
