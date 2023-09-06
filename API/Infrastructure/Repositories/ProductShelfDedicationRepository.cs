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

        public Task<string> LookUpForDedication(Product product)
        {
            throw new NotImplementedException();
        }
    }
}

