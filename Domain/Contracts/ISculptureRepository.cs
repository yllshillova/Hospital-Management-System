using Domain.Base;
using Domain.Entities;

namespace Domain.Contracts
{
    public interface ISculptureRepository : IEntityBaseRepository<Sculpture>
    {
        Task<IEnumerable<Sculpture>> GetBySculptorAsync(string name);
    }
}
