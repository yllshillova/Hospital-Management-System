using Domain.Contracts;
using Domain.Entities;
using Infrastructure.Base;

namespace Infrastructure.Repositories
{
    internal sealed class VisitRepository : EntityBaseRepository<Visit>, IVisitRepository
    {
        public VisitRepository(DataContext context) : base(context)
        {
        }
    }

}
