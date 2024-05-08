using Domain.Base;
using Domain.Entities;

namespace Domain.Contracts
{
    public interface IRoomRepository : IEntityBaseRepository<Room>
    {
        Task<Room> GetFirstFreeRoom(Guid departmentId);
        Task<Room> GetByIdWithPatientsAsync(Guid id);
        Task<Room> GetRoomByPatientIdAsync(Guid patientId);

    }
}
