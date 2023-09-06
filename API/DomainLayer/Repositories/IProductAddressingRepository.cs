using System;
using DomainLayer.SeedWork;
using DomainLayer.Models;
namespace DomainLayer.Repositories
{
	public interface IProductAddressingRepository: IRepository<ProductAddresing>
	{
		Task<bool> IsAddressEmpty(string addressBarcode);
		Task<bool> RemoveProduct(Product product);
		Task<ProductAddresing> FindByAddressCode(string AddressBarcode);
	}
}

