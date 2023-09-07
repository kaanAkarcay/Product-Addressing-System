using System;
using DomainLayer.Repositories;
using DomainLayer.Models;
using DomainLayer.SeedWork;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
	public class ProductCategoryRepository:Repository<ProductCategory>, IProductCategoryRepository
	{
		public ProductCategoryRepository(DbContext dbContext) : base(dbContext)
        {
		}

        public async Task<ProductCategory> FindByNameAsync(string name)
        {
            return await _dbContext.productCategories.SingleOrDefaultAsync(p => p.ProductsCategoryName == name);
        }
    }
}

