using System;
using DomainLayer.Models;
using Newtonsoft.Json.Linq;

namespace DomainLayer.Services
{
	public class ProductAddressingService: Service<ProductAddresing>
	{
		public ProductAddressingService(IUnitOfWork unitOfWork) : base(unitOfWork)
		{
			
		}
		public async Task<bool> CheckEmpty(string barcode)
		{
			return await _uow.ProductAddressingRepository.IsAddressEmpty(barcode);
		}

        public string getRequestForProduct( Product product)
		{
			return "";
		}


        public async Task<ProductAddresing> GetProductAddressingByAddressCodeAsync(string AddressCode)
        {
			return await _uow.ProductAddressingRepository.FindByAddressCode(AddressCode);

        }


    }
}

