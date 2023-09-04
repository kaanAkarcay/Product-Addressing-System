using System;
using DomainLayer.Repositories;
using DomainLayer.Models;
using DomainLayer.SeedWork;
namespace Infrastructure.Repositories
{
	public class ShelfRepository: Repository<Shelf>, IShelfRepository
	{
		public ShelfRepository(DbContext dbContext) : base(dbContext)
        {
		}
	}
}

