using Domain.Base;
using Domain.Contracts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System.Linq.Expressions;

namespace Infrastructure.Base
{
    internal abstract class EntityBaseRepository<T>(DataContext _context) : IEntityBaseRepository<T> where T : BaseEntity, new()
    {
        public async Task<IEnumerable<T>> GetAllAsync()
        {
            var entities = await _context.Set<T>().AsNoTracking().ToListAsync();
            return entities;
        }
        public async Task<IEnumerable<T>> GetAllAsync(params Expression<Func<T, object>>[] includeProperties)
        {
            IQueryable<T> query = _context.Set<T>();
            query = includeProperties.Aggregate(query, (current, includeProperty) => current.Include(includeProperty));
            var entities = await query.AsNoTracking().ToListAsync();
            return entities;
        }
        public async Task<T> GetByIdAsync(Guid Id)
        {
            var entity = await _context.Set<T>().AsNoTracking().FirstOrDefaultAsync(x => x.Id == Id);
            return entity;
        }
        public async Task<bool> CreateAsync(T entity)
        {
            await _context.Set<T>().AddAsync(entity);
            var result = await _context.SaveChangesAsync() > 0;
            return result;
        }
        public async Task<bool> UpdateAsync(T entity)
        {
            EntityEntry entityEntry = _context.Entry(entity);
            entityEntry.State = EntityState.Modified;
            var result = await _context.SaveChangesAsync() > 0;
            return result;
        }
        public async Task<bool> DeleteAsync(T entity)
        {
            _context.Remove(entity);
            var result = await _context.SaveChangesAsync() > 0;
            return result;
        }
        public async Task<bool> SoftDeleteAsync(T entity)
        {
            var entityToBeDeleted = await GetByIdAsync(entity.Id);
            if (entityToBeDeleted != null)
            {
                entityToBeDeleted.IsDeleted = true;
                _context.Update(entityToBeDeleted);
            }
            var result = await _context.SaveChangesAsync() > 0;
            return result;
        }
    }
}
