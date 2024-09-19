using Domain.Contracts;
using Domain.Entities;
using Infrastructure.Base;

namespace Infrastructure.Repositories
{
    internal sealed class ReviewRepository : EntityBaseRepository<Review>, IReviewRepository
    {
        private readonly DataContext _context;
        public ReviewRepository(DataContext context) : base(context)
        {
            _context = context;
        }



    }
}
