using Domain.Contracts;
using Domain.Entities;
using Infrastructure.Base;

namespace Infrastructure.Repositories
{
    internal sealed class LaboratoryScientistRepository : EntityBaseRepository<LaboratoryScientist>, ILaboratoryScientistRepository
    {
        public LaboratoryScientistRepository(DataContext context) : base(context)
        {
        }
    }
}
