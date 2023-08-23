using Microsoft.EntityFrameworkCore;
using API.Entities;
namespace API.Data
{
	public class APIDbContext : DbContext
	{
		public DbSet<ProductEntity> products { get; set; }


		public APIDbContext(): base(){//???

		}
    }
}

