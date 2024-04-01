using Domain.Contracts;
using Domain.Entities;
using Infrastructure.Base;

namespace Infrastructure.Repositories
{
    internal class DoctorRepository : EntityBaseRepository<Doctor>, IDoctorRepository
    {
        public DoctorRepository(DataContext context) : base(context)
        {
        }
    }
}