using System;
using DomainLayer.SeedWork;
using DomainLayer.Models;
namespace DomainLayer.Repositories
{
	public interface IBrandRepository: IRepository<Brand>
	{

        Task<Brand> FindByNameAsync(string name);
    }

   
}

