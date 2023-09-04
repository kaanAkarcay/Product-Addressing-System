using System;
using DomainLayer.SeedWork;
using DomainLayer.Models;
namespace DomainLayer.Repositories
{
	public interface IProductRepository:IRepository<Product>
	{

        Task<Product> FindByBarcodeAsync(long barcode);
	}
}

