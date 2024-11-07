using Domain.Base;
using Domain.Entities;

namespace Domain.Contracts
{
    public interface IDoctorRepository : IEntityBaseRepository<Doctor>
    {
        Task<IEnumerable<Doctor>> GetDoctorsByDepartmentIdAsync(Guid departmentId);
        Doctor GetDoctorById(Guid id);
    }
}