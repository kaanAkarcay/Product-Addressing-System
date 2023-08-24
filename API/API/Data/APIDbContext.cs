using Microsoft.EntityFrameworkCore;
using API.Entities;
namespace API.Data
{
	public class APIDbContext : DbContext
	{
		public DbSet<ProductEntity> products { get; set; }
		public DbSet<AdressEntity> adresses { get; set; }
		public DbSet<BrandEntity> brands { get; set; }
		public DbSet<Product_CategoryEntity> product_Categories { get; set; }
		public DbSet<ShelfEntity> shelves { get; set; }



        public APIDbContext(DbContextOptions<APIDbContext> options) : base(options) { }



    }
}


