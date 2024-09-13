using Domain.Contracts;
using Domain.Entities;
using Infrastructure.Base;

namespace Infrastructure.Repositories
{
    internal sealed class GroupRepository : EntityBaseRepository<Group>, IGroupRepository
    {
        private readonly DataContext _context;
        public GroupRepository(DataContext context) : base(context)
        {
            _context = context;
        }
    }
}
