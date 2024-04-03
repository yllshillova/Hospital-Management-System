using Domain.Contracts;
using Domain.Entities;
using Infrastructure.Base;

namespace Infrastructure.Repositories
{
    internal sealed class PatientRepository : EntityBaseRepository<Patient>, IPatientRepository
    {
        public PatientRepository(DataContext context) : base(context)
        {
        }
    }
}
