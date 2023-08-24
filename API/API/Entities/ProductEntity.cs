using System.ComponentModel.DataAnnotations;
namespace API.Entities
{
	public class ProductEntity
    {
        [Key]
		public long Barcode { get; set; }
		public required string Product_Name { get; set; }
		public required string Sex { get; set; }
        // Foreign key
        public int Brand_ID { get; set; }
        public int Product_Category_ID { get; set; }

        // Navigation property
        public required BrandEntity Brand { get; set; }
		public required Product_CategoryEntity Product_Category { get; set; }


        

	}
}

