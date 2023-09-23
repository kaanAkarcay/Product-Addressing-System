using DomainLayer.Models;
using Microsoft.EntityFrameworkCore;
namespace Infrastructure
{
    public class DbContext : Microsoft.EntityFrameworkCore.DbContext
    {
        public DbSet<Product> products { get; set; }
        public DbSet<Address> addresses { get; set; }
        public DbSet<Brand> brands { get; set; }
        public DbSet<ProductCategory> productCategories { get; set; }
        public DbSet<Shelf> shelves { get; set; }
        public DbSet<ProductAddresing> productAddresings { get; set; }
        public DbSet<ProductShelfDedication> productShelfDedications { get; set; }
        public DbSet<Order> orders { get; set; }
        public DbSet<OrderItem> orderItems { get; set; }


 



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
                .Property(p => p.Id)
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<Brand>()
                .Property(b => b.Id) // specifying the property
                .ValueGeneratedOnAdd(); // indicating it's auto-generated


            modelBuilder.Entity<ProductCategory>()
                .Property(pc => pc.Id) // specifying the property
                .ValueGeneratedOnAdd(); // indicating it's auto-generated

            modelBuilder.Entity<Shelf>()
                .Property(s => s.Id) // specifying the property
                .ValueGeneratedOnAdd(); // indicating it's auto-generated

            modelBuilder.Entity<Order>()
                .Property(o => o.Id)
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<OrderItem>()
                .Property(oi => oi.Id)
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<OrderItem>()
                .HasOne(oi => oi.Order)
                .WithMany(o => o.OrderItems)
                .HasForeignKey(oi => oi.OrderFId)
                .IsRequired(true);

            // Product-Brand relationship
            modelBuilder.Entity<Product>()
                .HasOne(p => p.Brand)
                .WithMany(b => b.Products)
                .HasForeignKey(p => p.BrandFId)
                .OnDelete(DeleteBehavior.SetNull)
                .IsRequired(false);

            // Product-ProductCategory relationship
            modelBuilder.Entity<Product>()
                .HasOne(p => p.ProductCategory)
                .WithMany(b => b.Products)
                .HasForeignKey(p => p.ProductCategoryFId)
                .OnDelete(DeleteBehavior.SetNull)
                .IsRequired(false);

            // Address-Shelf relationship
            modelBuilder.Entity<Address>()
                .HasOne(a => a.Shelf)
                .WithMany(s => s.Addresses) // Assuming Shelf doesn't have navigation property for Addresses
                .HasForeignKey(a => a.ShelfFId)
                .OnDelete(DeleteBehavior.Cascade)
                .IsRequired(true);
            modelBuilder.Entity<Address>()
                .Property(a => a.Id) // specifying the property
                .ValueGeneratedOnAdd(); // indicating it's auto-generated

            // ProductAddresing-Product relationship
            modelBuilder.Entity<ProductAddresing>()
                .HasOne(pa => pa.Product)
                .WithMany() // Assuming Product doesn't have a collection navigation property for ProductAddresing
                .HasForeignKey(pa => pa.ProductFId)
                .IsRequired(true);

            // ProductAddresing-Address relationship
            modelBuilder.Entity<ProductAddresing>()
                .HasOne(pa => pa.Address)
                .WithMany() // Assuming Address doesn't have a collection navigation property for ProductAddresing
                .HasForeignKey(pa => pa.AddressFId)
                .IsRequired(true);

            modelBuilder.Entity<ProductAddresing>()
                .Property(pa => pa.Id) // specifying the property
                .ValueGeneratedOnAdd(); // indicating it's auto-generated

            // ProductShelfDedication-Shelf relationship
            modelBuilder.Entity<ProductShelfDedication>()
                .HasOne(psd => psd.Shelf)
                .WithMany() // Assuming Shelf doesn't have a collection navigation property for ProductShelfDedication
                .HasForeignKey(psd => psd.ShelfFId)
                .IsRequired(true);

            // ProductShelfDedication-Brand relationship
            modelBuilder.Entity<ProductShelfDedication>()
                .HasOne(psd => psd.Brand)
                .WithMany() // Using the existing collection of products, adjust if there's a different property
                .HasForeignKey(psd => psd.BrandFId)
                //.OnDelete(DeleteBehavior.SetNull)//?????
                .IsRequired(true);

            // ProductShelfDedication-ProductCategory relationship
            modelBuilder.Entity<ProductShelfDedication>()
                .HasOne(psd => psd.ProductCategory)
                .WithMany() // Using the existing collection of products, adjust if there's a different property
                .HasForeignKey(psd => psd.ProductCategoryFId)
                .OnDelete(DeleteBehavior.SetNull)
                .IsRequired(false);
            modelBuilder.Entity<ProductShelfDedication>()
                .Property(psd => psd.Id) // specifying the property
                .ValueGeneratedOnAdd(); // indicating it's auto-generated

        }
    }
}


