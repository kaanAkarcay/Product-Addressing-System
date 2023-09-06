using System;
using DomainLayer.Repositories;
using DomainLayer.SeedWork;
namespace DomainLayer
{
    public interface IUnitOfWork : IDisposable
	{
		IAddressRepository AddressRepository { get; }
		IBrandRepository BrandRepository { get; }
		IProductRepository ProductRepository { get; }
		IProductCategoryRepository ProductCategoryRepository { get; }
		IShelfRepository ShelfRepository { get; }
		IProductAddressingRepository ProductAddressingRepository { get; }
		IProductShelfDedicationRepository ProductShelfDedicationRepository { get; }
		IRepository<Entity> Repository { get; }


		Task<int> SaveChangesAsync(); //in order to give it to _uow
	}
}

