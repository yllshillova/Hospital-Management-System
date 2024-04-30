using Domain.Contracts;
using Domain.Entities;
using Infrastructure.Base;

namespace Infrastructure.Repositories
{
    internal sealed class RoomPatientRepository : EntityBaseRepository<RoomPatient>, IRoomPatientRepository
    {
        public RoomPatientRepository(DataContext context) : base(context)
        {
        }
    }
}