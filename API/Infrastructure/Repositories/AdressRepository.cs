using System;
using DomainLayer.Repositories;
using DomainLayer.Models;
using DomainLayer.SeedWork;
namespace Infrastructure.Repositories
{
	public class AdressRepository: Repository<Adress>, IAdressRepository
	{
		public AdressRepository(DbContext dbContext) : base(dbContext)
        {
		}
	}
}

