using System;
using DomainLayer.Models;
using Newtonsoft.Json.Linq;

namespace DomainLayer.Services
{
	public class ProductShelfDedicationService : Service<ProductShelfDedication>
	{
		public ProductShelfDedicationService(IUnitOfWork unitOfWork) : base(unitOfWork)
		{
		}
	}
}

