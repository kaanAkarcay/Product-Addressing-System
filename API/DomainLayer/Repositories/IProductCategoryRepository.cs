using System;
using DomainLayer.SeedWork;
using DomainLayer.Models;
namespace DomainLayer.Repositories
{
	public interface IProductCategoryRepository: IRepository<ProductCategory>
	{
        Task<ProductCategory> FindByNameAsync(string name);


    }
}

