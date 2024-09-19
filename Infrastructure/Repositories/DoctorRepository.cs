using Domain.Contracts;
using Domain.Entities;
using Infrastructure.Base;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    internal sealed class DoctorRepository : EntityBaseRepository<Doctor>, IDoctorRepository
    {
        private readonly DataContext _context;
        public DoctorRepository(DataContext context) : base(context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Doctor>> GetDoctorsByDepartmentIdAsync(Guid departmentId)
        {
            var doctors = await _context.Doctors
                .Where(x => x.DepartmentId == departmentId)
                .AsNoTracking()
                .ToListAsync();

            return doctors;
        }
        // Synchronous method to get doctor by ID
        public Doctor GetDoctorById(Guid id)
        {
            var doctor = _context.Doctors.Find(id);
            return doctor;
        }
    }
}