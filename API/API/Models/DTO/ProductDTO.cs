using System.ComponentModel.DataAnnotations;
namespace API.Models.DTO
{
    public class ProductDTO
    {
        [Required]
        [Range(1000000000000, 9999999999999)]
        public long Barcode { get; set; }
        public required string Product_Name { get; set; }
        public required string Sex { get; set; }
        // Foreign key
        public int Brand_ID { get; set; }
        public int Product_Category_ID { get; set; }

        // Navigation property
        public required string Brand { get; set; }
        public required string Product_Category { get; set; }




    }
}

