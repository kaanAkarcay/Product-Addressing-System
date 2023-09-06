using System;
using DomainLayer.Repositories;
using DomainLayer.Models;
using DomainLayer.SeedWork;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
	public class AddressRepository : Repository<Address>, IAddressRepository
	{
		public AddressRepository(DbContext dbContext) : base(dbContext)
		{

		}

        public async Task<Address> FindAddressByAddressCode(string AddressCode)
        {
            return await _dbContext.Set<Address>().SingleOrDefaultAsync(x => x.AdressBarcode == AddressCode);
        }
        
    }

}