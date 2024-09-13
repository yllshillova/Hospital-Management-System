using Domain.Contracts;
using Domain.Entities;
using Infrastructure.Base;

namespace Infrastructure.Repositories
{
    internal sealed class BuildingRepository : EntityBaseRepository<Building>, IBuildingRepository
    {
        private readonly DataContext _context;
        public BuildingRepository(DataContext context) : base(context)
        {
            _context = context;
        }


    }
}
