using Domain.Base;
using Domain.Entities;

namespace Domain.Contracts
{
    public interface IRoomRepository : IEntityBaseRepository<Room>
    {
        Task<Room> GetFirstFreeRoom();
        Task<Room> GetByIdWithPatientsAsync(Guid id);
    }
}
