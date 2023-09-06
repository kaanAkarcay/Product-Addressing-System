using System;
using DomainLayer.SeedWork;
using DomainLayer.Models;
namespace DomainLayer.Repositories
{
	public interface IShelfRepository: IRepository<Shelf>
	{
        Task<Shelf> FindByShelfByNameAsync(string shelfName);

       
    }
}

