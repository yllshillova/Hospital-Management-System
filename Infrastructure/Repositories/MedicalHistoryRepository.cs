using Domain.Contracts;
using Domain.Entities;
using Infrastructure.Base;

namespace Infrastructure.Repositories
{
    internal class MedicalHistoryRepository : EntityBaseRepository<MedicalHistory>, IMedicalHistoryRepository
    {
        public MedicalHistoryRepository(DataContext context) : base(context)
        {
        }
    }
}
