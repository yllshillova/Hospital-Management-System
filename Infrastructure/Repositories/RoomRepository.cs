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

        public async Task<Room> GetFirstFreeRoom()
        {
            var firstFreeRoom = await _context.Rooms.FirstOrDefaultAsync(room => room.IsFree);
            return firstFreeRoom;
        }
        public async Task<IEnumerable<Room>> GetAllRoomsAsync()
        {
            var rooms = await _context.Rooms
                .Include(r => r.Patients)
                .ToListAsync();
            return rooms;
        }
        public async Task<Room> GetByIdWithPatientsAsync(Guid id)
        {
            var room = await _context.Rooms
                .Include(r => r.Patients)
                .FirstOrDefaultAsync(r => r.Id == id);
            return room;
        }

    }
}
