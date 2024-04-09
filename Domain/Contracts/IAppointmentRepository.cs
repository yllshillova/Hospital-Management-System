using Domain.Base;
using Domain.Entities;

namespace Domain.Contracts
{
    public interface IAppointmentRepository : IEntityBaseRepository<Appointment>
    {
        Task<IEnumerable<Appointment>> GetAppointmentsByDoctorId(Guid doctorId);
        Task<IEnumerable<Appointment>> GetAppointmentsByPatientId(Guid PatientId);
        Task<bool> IsValidAppointment(DateTime checkInDate, DateTime checkOutDate, Guid doctorId);
    }
}
