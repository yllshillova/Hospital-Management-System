using Domain.Contracts;
using Domain.Entities;
using Infrastructure.Base;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    internal sealed class VisitRepository : EntityBaseRepository<Visit>, IVisitRepository
    {
        private readonly DataContext _context;
        public VisitRepository(DataContext context) : base(context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Visit>> GetVisitsByDoctorIdAsync(Guid doctorId)
        {
            var visits = await _context.Visits
                .Where(x => x.DoctorId == doctorId)
                .AsNoTracking()
                .ToListAsync();

            return visits;
        }
        public async Task<IEnumerable<Visit>> GetVisitsByPatientIdAsync(Guid patientId)
        {
            var visits = await _context.Visits
                .Where(x => x.PatientId == patientId)
                .AsNoTracking()
                .ToListAsync();

            return visits;
        }
    }

}
