using System;
using DomainLayer.SeedWork;
using DomainLayer.Models;
namespace DomainLayer.Repositories
{
    public interface IAddressRepository : IRepository<Address>
    {
        Task<Address> FindAddressByAddressCode(string AddressCode);
    }
}

