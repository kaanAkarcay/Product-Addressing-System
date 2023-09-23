using System;
using System.ComponentModel.DataAnnotations;
using DomainLayer.SeedWork;

namespace DomainLayer.Models
{
	public class ProductCategory : Entity
    {
    
        public required string ProductsCategoryName { get; set; }

        // Navigation property for related products
        public  ICollection<Product>? Products { get; set; }
    }
}

