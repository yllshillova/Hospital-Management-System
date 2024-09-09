using Domain.Contracts;
using Domain.Entities;
using Infrastructure.Base;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    internal sealed class ContractRepository : EntityBaseRepository<Contract>, IContractRepository
    {
        private readonly DataContext _context;
        public ContractRepository(DataContext context) : base(context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Contract>> GetByStartDate(DateTime startDate)
        {
            var contracts = await _context.Contracts.Where(c => c.StartDate == startDate).AsNoTracking().ToListAsync();
            return contracts;
        }

        public async Task<IEnumerable<Contract>> GetByEmployee(Guid employeeId)
        {
            var contracts = await _context.Contracts.Where(c => c.EmployeeId == employeeId).AsNoTracking().ToListAsync();
            return contracts;
        }


    }
}
