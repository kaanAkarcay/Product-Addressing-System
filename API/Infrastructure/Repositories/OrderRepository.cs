using System;
using System;
using DomainLayer.Repositories;
using DomainLayer.Models;
using Microsoft.EntityFrameworkCore;
using DomainLayer.SeedWork;
using System.Xml.Linq;

namespace Infrastructure.Repositories
{
	public class OrderRepository: Repository<Order>, IOrderRepository
	{
		public OrderRepository(DbContext dbContext) : base(dbContext)
		{
		}

        public async Task<Order> FindByCodeAsync(string code)
        {
            try
            {
                return await _dbContext.Set<Order>().SingleOrDefaultAsync(x => x.OrderCode == code);
            }
            catch (InvalidOperationException)
            {
                return null; // Return null if no matching brand is found
            }
        }
    }
}

