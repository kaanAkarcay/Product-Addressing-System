using System;
using System.ComponentModel.DataAnnotations;
using DomainLayer.SeedWork;

namespace DomainLayer.Models
{
	public class Brand : Entity
    {
        [Key]
        public int BrandId { get; set; }
        public required string BrandName { get; set; }


        // Navigation property for related products
        public  ICollection<Product>? Products { get; set; }
    }
}

