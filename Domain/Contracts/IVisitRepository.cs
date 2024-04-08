using Domain.Base;
using Domain.Entities;

namespace Domain.Contracts
{
    public interface IVisitRepository : IEntityBaseRepository<Visit>
    {
        Task<IEnumerable<Visit>> GetVisitsByDoctorIdAsync(Guid doctorId);
    }
}
