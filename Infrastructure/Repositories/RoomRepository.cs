using Domain.Contracts;
using Domain.Entities;
using Infrastructure.Base;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    internal sealed class RoomRepository : EntityBaseRepository<Room>, IRoomRepository
    {
        private readonly DataContext _context;
        public RoomRepository(DataContext context) : base(context)
        {
            _context = context;
        }

        public async Task<Room> GetFirstFreeRoom(Guid departmentId)
        {
            var room = await _context.Rooms
                .Where(room => room.BedsAvailable > 0 && room.DepartmentId == departmentId)
                .FirstOrDefaultAsync();
            return room;
        }
        public async Task<Room> GetByIdWithPatientsAsync(Guid id)
        {
            var room = await _context.Rooms.Include(r => r.Patients).FirstOrDefaultAsync(r => r.Id == id);
            return room;
        }
        public async Task<Room> GetRoomByPatientIdAsync(Guid PatientId)
        {
            var room = await _context.Rooms
                .Include(r => r.Patients) // Include patients related to the room
                .FirstOrDefaultAsync(r => r.Patients.Any(p => p.Id == PatientId));
            return room;
        }
    }
}
