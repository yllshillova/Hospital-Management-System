using Domain.Base;
using Domain.Entities;

namespace Domain.Contracts
{
    public interface IContractRepository : IEntityBaseRepository<Contract>
    {
        Task<IEnumerable<Contract>> GetByStartDate(DateTime startDate);
        Task<IEnumerable<Contract>> GetByEmployee(Guid employeeId);
    }
}
