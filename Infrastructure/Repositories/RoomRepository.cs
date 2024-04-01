using Domain.Contracts;
using Domain.Entities;
using Infrastructure.Base;

namespace Infrastructure.Repositories
{
    internal class RoomRepository : EntityBaseRepository<Room>, IRoomRepository
    {
        public RoomRepository(DataContext context) : base(context)
        {
        }
    }
}
