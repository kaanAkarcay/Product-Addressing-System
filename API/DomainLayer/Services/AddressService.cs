using System;
using DomainLayer.Models;
using Newtonsoft.Json.Linq;
namespace DomainLayer.Services
{
	public class AddressService: Service<Address>
	{
		public AddressService(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
		}

        public async Task<Address> GetAddressByAddressCodeAsync(string AddressCode)
        {
            return await _uow.AddressRepository.FindAddressByAddressCode(AddressCode);
        }

      
    }
}

