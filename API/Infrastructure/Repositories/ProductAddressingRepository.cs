using System;
using DomainLayer.Models;
using DomainLayer.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class ProductAddressingRepository : Repository<ProductAddresing>, IProductAddressingRepository
    {
        public ProductAddressingRepository(DbContext dbContext) : base(dbContext)
        {
        }

        public async Task<ProductAddresing> FindByAddressCode(string AddressBarcode)
        {
            return await _dbContext.productAddresings.FirstOrDefaultAsync(pa => pa.AddressCode == AddressBarcode);
        }

        public async Task<bool> IsAddressEmpty(string addressBarcode)
        {
            var result = await _dbContext.productAddresings.FirstOrDefaultAsync(pa => pa.AddressCode == addressBarcode);
            if (result == null)
            {
                return true;
            }
            else
                return false;
        }

        public Task<bool> RemoveProduct(Product product)
        {
            throw new NotImplementedException();
        }
    }
}

