using Domain.Base;
using Domain.Entities;

namespace Domain.Contracts
{
    public interface IEmployeeRepository : IEntityBaseRepository<Employee>
    {
    }
}
