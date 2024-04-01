using Domain.Contracts;
using Domain.Entities;
using Infrastructure.Base;

namespace Infrastructure.Repositories
{
    internal sealed class LabTestRepository : EntityBaseRepository<LabTest>, ILabTestRepository
    {
        public LabTestRepository(DataContext context) : base(context)
        {
        }
    }
}