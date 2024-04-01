using Domain.Base;
using System.Linq.Expressions;

namespace Infrastructure.Base
{
    internal class EntityBaseRepository<T> : IEntityBaseRepository<T> where T : BaseEntity, new()
    {
         public Task<IEnumerable<T>> GetAllAsync()
        {
            throw new NotImplementedException();
        }
        public Task<IEnumerable<T>> GetAllAsync(params Expression<Func<T, object>>[] includeProperties)
        {
            throw new NotImplementedException();
        }
        public Task<T> GetByIdAsync(Guid Id)
        {
            throw new NotImplementedException();
        }
        public Task CreateAsync(T entity)
        {
            throw new NotImplementedException();
        }
        public Task UpdateAsync(T entity)
        {
            throw new NotImplementedException();
        }
        public Task DeleteAsync(T entity)
        {
            throw new NotImplementedException();
        }
    }
}
