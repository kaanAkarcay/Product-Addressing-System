using System;
using DomainLayer.Repositories;
using DomainLayer.SeedWork;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
namespace Infrastructure.Repositories
{
	public class Repository<T>: IRepository<T> where T: Entity
	{

        private protected DbContext _dbContext;

		public Repository(DbContext dbContext)
		{
            _dbContext = dbContext;
		}

        public bool Create(T e)
        {
            _dbContext.Add(e);
            return true;
        }

        public bool Delete(T e)
        {
            _dbContext.Remove(e);
            return true;
        }

        public virtual async Task<List<T>> FindAllAsync()
        {
           return await _dbContext.Set<T>().ToListAsync();

        }

        public virtual async Task<T> FindByIdAsync(int Id)
        {
            return await _dbContext.Set<T>().FindAsync(Id);
        }

        public bool Update(T e)
        {
            _dbContext.Update(e);
            return true;
        }
    }
}

