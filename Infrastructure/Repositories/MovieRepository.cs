using Domain.Contracts;
using Domain.Entities;
using Infrastructure.Base;

namespace Infrastructure.Repositories
{
    internal sealed class MovieRepository : EntityBaseRepository<Movie>, IMovieRepository
    {
        private readonly DataContext _context;
        public MovieRepository(DataContext context) : base(context)
        {
            _context = context;
        }



    }
}
