using Domain.Contracts;
using Domain.Entities;
using Infrastructure.Base;

namespace Infrastructure.Repositories
{
    internal sealed class NurseRepository : EntityBaseRepository< Nurse>, INurseRepository
    {
        public NurseRepository(DataContext context) : base(context)
        {
        }
    }
}
