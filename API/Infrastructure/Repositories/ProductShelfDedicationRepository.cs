using System;
using DomainLayer.Repositories;
using DomainLayer.Models;
using Microsoft.EntityFrameworkCore;
using DomainLayer.SeedWork;

namespace Infrastructure.Repositories
{
	public class ProductShelfDedicationRepository: Repository<ProductShelfDedication>, IProductShelfDedicationRepository
	{
		public ProductShelfDedicationRepository(DbContext dbContext) : base(dbContext)
		{
		}

        public async Task<ProductShelfDedication> LookUpForDedication(Product product)
        {
            var result = await _dbContext.productShelfDedications.FirstOrDefaultAsync(
                pad => pad.BrandFId == product.BrandFId &&
                pad.Sex == product.Sex &&
                pad.ProductCategoryFId == product.ProductCategoryFId
                );
            if (result==null)
            {
                result = await _dbContext.productShelfDedications.FirstOrDefaultAsync(
                pad => pad.BrandFId == product.BrandFId &&
                pad.Sex == product.Sex &&
                pad.ProductCategoryFId == null
                );
                if (result == null)
                {
                   result = await _dbContext.productShelfDedications.FirstOrDefaultAsync(
                   pad => pad.BrandFId == product.BrandFId &&
                    (string.IsNullOrEmpty(pad.Sex) || pad.Sex == null) &&
                   pad.ProductCategoryFId == null

                   );
                    if (result == null)
                    {
                        return null;//not found
                    }
                    return result;
                }
                return result;

            }
            return result;
        }
    }
}

