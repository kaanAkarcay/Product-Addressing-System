using System;
using DomainLayer;
using DomainLayer.Repositories;
using DomainLayer.SeedWork;
using Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure
{
	public class UnitOfWork : IUnitOfWork
	{
		private DbContext _DbContext;


        public IAdressRepository AdressRepository { get; }
        public IBrandRepository BrandRepository { get; }
        public IProductRepository ProductRepository { get; }
        public IProductCategoryRepository ProductCategoryRepository { get; }
        public IShelfRepository ShelfRepository { get; }
        public IRepository<Entity> Repository { get; }

        //public IRepository<Entity> Repository =>  new Repository<Entity>(_DbContext);
        public UnitOfWork(DbContext dbContext)
        {
            _DbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));

            AdressRepository = new AdressRepository(_DbContext);
            BrandRepository = new BrandRepository(_DbContext);
            ProductRepository = new ProductRepository(_DbContext);
            ProductCategoryRepository = new ProductCategoryRepository(_DbContext);
            ShelfRepository = new ShelfRepository(_DbContext);
            // Initialize the Repository property
            Repository = new Repository<Entity>(_DbContext);

        }

        public void Dispose()
        {
            _DbContext.Dispose();
            GC.SuppressFinalize(this);
        }

        public async Task<int> SaveChangesAsync()
        {
            
            return await _DbContext.SaveChangesAsync();
        }
    }
}

