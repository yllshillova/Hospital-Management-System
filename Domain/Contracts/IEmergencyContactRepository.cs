using Domain.Base;
using Domain.Entities;

namespace Domain.Contracts
{
    public interface IEmergencyContactRepository : IEntityBaseRepository<EmergencyContact>
    {
        //Task<IEnumerable<EmergencyContact>> GetAllAsync(Func<EmergencyContact, bool> predicate);
        Task<IEnumerable<EmergencyContact>> GetByPatientIdAsync(Guid patientId);
    }
}
