using System.ComponentModel.DataAnnotations;
namespace API.Models
{
    public class ProductDTO
    {
        [Required]
        [Range(1000000000000, 9999999999999)]
        public long Barcode { get; set; }
        public required string ProductName { get; set; }
        public required string Sex { get; set; }

        // Navigation property
        public  string Brand { get; set; }
        public  string ProductCategory { get; set; }




    }
}