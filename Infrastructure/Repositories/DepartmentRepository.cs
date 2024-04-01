using Domain.Contracts;
using Domain.Entities;
using Infrastructure.Base;

namespace Infrastructure.Repositories
{
    internal sealed class DepartmentRepository : EntityBaseRepository<Department>, IDepartmentRepository
    {
        public DepartmentRepository(DataContext context) : base(context)
        {
        }
    }
}