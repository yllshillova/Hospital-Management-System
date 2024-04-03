using Domain.Contracts;
using Domain.Entities;
using Infrastructure.Base;

namespace Infrastructure.Repositories
{
    internal sealed class EmergencyContactRepository : EntityBaseRepository<EmergencyContact>, IEmergencyContactRepository
    {
        public EmergencyContactRepository(DataContext _context) : base(_context)
        {
        }
    }

}