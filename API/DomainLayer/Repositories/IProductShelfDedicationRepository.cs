using System;
using DomainLayer.SeedWork;
using DomainLayer.Models;
namespace DomainLayer.Repositories
{
	public interface IProductShelfDedicationRepository: IRepository<ProductShelfDedication>
	{

		Task<ProductShelfDedication> LookUpForDedication(Product product);

	}
}

