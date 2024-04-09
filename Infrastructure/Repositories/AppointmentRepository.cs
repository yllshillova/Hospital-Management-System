using Domain.Contracts;
using Domain.Entities;
using Infrastructure.Base;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    internal sealed class AppointmentRepository : EntityBaseRepository<Appointment>, IAppointmentRepository
    {
        private readonly DataContext _context;

        public AppointmentRepository(DataContext context) : base(context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Appointment>> GetAppointmentsByPatientId(Guid PatientId)
        {
            var appointments = await _context.Appointments
                .Where(x => x.PatientId == PatientId)
                .AsNoTracking()
                .ToListAsync();

            return appointments;
        }

    }
}
