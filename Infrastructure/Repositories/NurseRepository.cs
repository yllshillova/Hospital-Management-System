using Domain.Contracts;
using Domain.Entities;
using Infrastructure.Base;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    internal sealed class NurseRepository : EntityBaseRepository<Nurse>, INurseRepository
    {
        private readonly DataContext _context;
        public NurseRepository(DataContext context) : base(context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Nurse>> GetNursesByDepartmentIdAsync(Guid departmentId)
        {
            var nurses = await _context.Nurses
                .Where(x => x.DepartmentId == departmentId)
                .AsNoTracking()
                .ToListAsync();

            return nurses;
        }
        public Nurse GetNurseById(Guid id)
        {
            var nurse = _context.Nurses.Find(id);
            return nurse;
        }

    }
}
