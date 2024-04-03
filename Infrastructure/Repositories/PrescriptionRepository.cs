using Domain.Contracts;
using Domain.Entities;
using Infrastructure.Base;

namespace Infrastructure.Repositories
{
    internal sealed class PrescriptionRepository : EntityBaseRepository<Prescription>, IPrescriptionRepository
    {
        public PrescriptionRepository(DataContext context) : base(context)
        {
        }
    }

}
