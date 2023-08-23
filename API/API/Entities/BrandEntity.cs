namespace API.Entities
{
	public class BrandEntity
    {
        public int Brand_ID { get; set; }
        public required string Brand_Name { get; set; }
        

        // Navigation property for related products
        public required ICollection<ProductEntity> Products { get; set; }
    }
}

