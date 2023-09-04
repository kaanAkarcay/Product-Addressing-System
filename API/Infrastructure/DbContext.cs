using DomainLayer.Models;
using Microsoft.EntityFrameworkCore;
namespace Infrastructure
{
    public class DbContext : Microsoft.EntityFrameworkCore.DbContext
    {
        public DbSet<Product> products { get; set; }
        public DbSet<Adress> adresses { get; set; }
        public DbSet<Brand> brands { get; set; }
        public DbSet<ProductCategory> productCategories { get; set; }
        public DbSet<Shelf> shelves { get; set; }



        public DbContext(DbContextOptions<DbContext> options) : base(options) { }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseMySql("server=localhost;port=8889;database=Flo;user=root;password=root;TreatTinyAsBoolean=true;",
                         new MySqlServerVersion(new Version(8, 0, 21)));
            }
        }

        // If you have any model configurations, you can override the `OnModelCreating` method
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Product>()
        .HasOne(p => p.Brand)
        .WithMany(b => b.Products)
        .HasForeignKey(p => p.BrandFId)
        .OnDelete(DeleteBehavior.SetNull)
        .IsRequired(false); // This allows the BrandId to be nullable
           // modelBuilder.Entity<Product>().Navigation(p => p.Brand).IsRequired(false);

            modelBuilder.Entity<Product>()
                .HasOne(p => p.ProductCategory)
                .WithMany(b => b.Products)
                .HasForeignKey(p => p.ProductCategoryFId)
                .OnDelete(DeleteBehavior.SetNull)
                .IsRequired(false); // This allows the ProductCategoryId to be nullable
                                    //base.OnModelCreating(modelBuilder);
                                    // modelBuilder.Entity<Product>().Navigation(p => p.ProductCategory).IsRequired(false);


            // Adress to Product relationship
            modelBuilder.Entity<Adress>()
                .HasOne(a => a.Product)
                .WithMany()
                .HasForeignKey(a => a.ProductBarcode)
                .OnDelete(DeleteBehavior.Restrict);

            // Adress to Shelf relationship
            modelBuilder.Entity<Adress>()
                .HasOne(a => a.Shelf)
                .WithMany(s => s.Adresses)
                .HasForeignKey(a => a.ShelfId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}


