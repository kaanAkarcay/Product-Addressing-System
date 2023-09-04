using System;
using DomainLayer.Repositories;
using DomainLayer.Models;
using DomainLayer.SeedWork;

namespace Infrastructure.Repositories
{
	public class ProductRepository: Repository<Product> , IProductRepository
	{
		public ProductRepository(DbContext dbContext): base (dbContext)
		{
		}
        
        public Task<Product> FindByBarcodeAsync(long barcode)
        {
            throw new NotImplementedException();
        }
        
    }
}

