using Domain.Base;
using Domain.Entities;

namespace Domain.Contracts
{
    public interface IAppointmentRepository : IEntityBaseRepository<Appointment>
    {
        Task<IEnumerable<Appointment>> GetAppointmentsByPatientId(Guid PatientId);
    }
}
