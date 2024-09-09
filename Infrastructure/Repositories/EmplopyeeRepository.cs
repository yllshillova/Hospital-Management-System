using Domain.Contracts;
using Domain.Entities;
using Infrastructure.Base;

namespace Infrastructure.Repositories
{
    internal sealed class EmployeeRepository : EntityBaseRepository<Employee>, IEmployeeRepository
    {
        private readonly DataContext _context;
        public EmployeeRepository(DataContext context) : base(context)
        {
            _context = context;
        }
        //public async Task<Employee> GetEmployeeByFullName(string fullName)
        //{
        //    return await _context.Employees
        //        .Where(e => e.FullName == fullName)
        //        .FirstOrDefaultAsync();
        //}

    }
}
