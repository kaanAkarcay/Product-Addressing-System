namespace API.Entities
{
	public class Product_CategoryEntity
    {
		public int Product_Category_ID { get; set; }
		public required string Product_Category_Name { get; set; }

        // Navigation property for related products
        public required ICollection<ProductEntity> Products { get; set; }
    }
}

