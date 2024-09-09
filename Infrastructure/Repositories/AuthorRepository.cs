using Domain.Contracts;
using Domain.Entities;
using Infrastructure.Base;

namespace Infrastructure.Repositories
{
    internal sealed class AuthorRepository : EntityBaseRepository<Author>, IAuthorRepository
    {
        private readonly DataContext _context;
        public AuthorRepository(DataContext context) : base(context)
        {
            _context = context;
        }
    }
}
