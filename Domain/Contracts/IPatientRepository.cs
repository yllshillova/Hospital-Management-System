using Domain.Base;
using Domain.Entities;

namespace Domain.Contracts
{
    public interface IPatientRepository : IEntityBaseRepository<Patient>
    {
        Task<IEnumerable<Patient>> GetLatestPatientsAsync(int count);
    }
}
