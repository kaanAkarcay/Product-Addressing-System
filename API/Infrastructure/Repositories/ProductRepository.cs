using System;
using DomainLayer.Repositories;
using Microsoft.EntityFrameworkCore;
using DomainLayer.Models;
using DomainLayer.SeedWork;

namespace Infrastructure.Repositories
{
	public class ProductRepository: Repository<Product> , IProductRepository
	{
		public ProductRepository(DbContext dbContext): base (dbContext)
		{
		}
        
        public async Task<Product> FindByBarcodeAsync(long barcode)
        {
            return await _dbContext.Set<Product>().SingleOrDefaultAsync(x => x.Barcode == barcode);
        }
        
    }
}

