using System;
using DomainLayer.Repositories;
using DomainLayer.Models;
using Microsoft.EntityFrameworkCore;
using DomainLayer.SeedWork;

namespace Infrastructure.Repositories
{
	public class BrandRepository: Repository<Brand>, IBrandRepository
	{
		public BrandRepository(DbContext dbContext) : base(dbContext)
        {
		}

        public async Task<Brand> FindByNameAsync(string name)
        {
            try
            {
                return await _dbContext.brands.FirstAsync(p => p.BrandName == name);
            }
            catch (InvalidOperationException)
            {
                return null; // Return null if no matching brand is found
            }
        }
    }
}

