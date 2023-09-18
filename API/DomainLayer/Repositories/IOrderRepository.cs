using System;
using DomainLayer.SeedWork;
using DomainLayer.Models;
namespace DomainLayer.Repositories
{
	public interface IOrderRepository: IRepository<Order>
	{
        Task<Order> FindByCodeAsync(string code);
    }
}

