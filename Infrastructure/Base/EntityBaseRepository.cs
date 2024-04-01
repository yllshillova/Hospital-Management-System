using Domain.Base;
using Domain.Contracts;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Infrastructure.Base
{
    internal abstract class EntityBaseRepository<T>(DataContext context) : IEntityBaseRepository<T> where T : BaseEntity, new()
    {
         public async Task<IEnumerable<T>> GetAllAsync()
        {
            var entities = await context.Set<T>().AsNoTracking().ToListAsync();
            return entities; 
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
