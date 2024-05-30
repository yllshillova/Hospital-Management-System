using Domain.Contracts;
using Domain.Entities;
using Infrastructure.Base;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    internal sealed class EmergencyContactRepository : EntityBaseRepository<EmergencyContact>, IEmergencyContactRepository
    {
        private readonly DataContext _context;
        public EmergencyContactRepository(DataContext context) : base(context)
        {
            _context = context;

        }
        //public async Task<IEnumerable<EmergencyContact>> GetAllAsync(Func<EmergencyContact, bool> predicate)
        //{
        //    return await Task.Run(() => _context.EmergencyContacts.Where(predicate).ToList());
        //}

        public async Task<IEnumerable<EmergencyContact>> GetByPatientIdAsync(Guid patientId)
        {
            return await _context.EmergencyContacts
                                 .Where(ec => ec.PatientId == patientId)
                                 .ToListAsync();
        }
    }

}