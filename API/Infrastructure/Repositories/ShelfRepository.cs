using System;
using DomainLayer.Repositories;
using DomainLayer.Models;
using DomainLayer.SeedWork;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
	public class ShelfRepository: Repository<Shelf>, IShelfRepository
	{
		public ShelfRepository(DbContext dbContext) : base(dbContext)
        {
		}

        public async Task<Shelf> FindByShelfIdAsync(string shelfId)
        {
            return await _dbContext.Set<Shelf>().SingleOrDefaultAsync(x => x.ShelfId == shelfId);
        }
    }
}

