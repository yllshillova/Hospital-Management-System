using Domain.Base;
using Domain.Entities;

namespace Domain.Contracts
{
    public interface INurseRepository : IEntityBaseRepository<Nurse>
    {
        Task<IEnumerable<Nurse>> GetNursesByDepartmentIdAsync(Guid departmentId);
        Nurse GetNurseById(Guid Id);
    }
}
