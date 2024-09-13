using Domain.Contracts;
using Domain.Entities;
using Infrastructure.Base;

namespace Infrastructure.Repositories
{
    internal sealed class MemberRepository : EntityBaseRepository<Member>, IMemberRepository
    {
        private readonly DataContext _context;
        public MemberRepository(DataContext context) : base(context)
        {
            _context = context;
        }



    }
}
