using Domain.Contracts;
using Domain.Entities;
using Infrastructure.Base;

namespace Infrastructure.Repositories
{
    internal sealed class RenovationRepository : EntityBaseRepository<Renovation>, IRenovationRepository
    {
        private readonly DataContext _context;
        public RenovationRepository(DataContext context) : base(context)
        {
            _context = context;
        }


    }
}
