using System;
using System;
using DomainLayer.Repositories;
using DomainLayer.Models;
using Microsoft.EntityFrameworkCore;
using DomainLayer.SeedWork;
namespace Infrastructure.Repositories
{
	public class OrderItemRepository: Repository<OrderItem>, IOrderItemRepository
	{
		public OrderItemRepository(DbContext dbContext) : base(dbContext)
		{
		}
	}
}

