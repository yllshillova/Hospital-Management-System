using Domain.Base;
using Domain.Entities;

namespace Domain.Contracts
{
    public interface IProductRepository : IEntityBaseRepository<Product>
    {
    }
}
