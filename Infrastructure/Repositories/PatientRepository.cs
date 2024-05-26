using Domain.Contracts;
using Domain.Entities;
using Infrastructure.Base;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    internal sealed class PatientRepository : EntityBaseRepository<Patient>, IPatientRepository
    {
        private readonly DataContext _context;
        public PatientRepository(DataContext context) : base(context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Patient>> GetLatestPatientsAsync(int count)
        {

            var patients = await _context.Patients.OrderByDescending(u => u.CreatedAt).Take(count).ToListAsync();
            return patients;
        }

    }
}
