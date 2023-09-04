using System;
using DomainLayer.Models;
namespace DomainLayer.Services
{
	public class ProductCategoryService : Service<ProductCategory>
	{
		public ProductCategoryService(IUnitOfWork unitOfWork): base(unitOfWork)
		{
		}



	}
}

