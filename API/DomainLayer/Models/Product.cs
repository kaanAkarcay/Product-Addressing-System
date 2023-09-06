using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using DomainLayer.SeedWork;

namespace DomainLayer.Models
{
	public class Product: Entity
	{
        [Key]
        public required long Barcode { get; set; }
        public required string ProductName { get; set; }
        public required string Sex { get; set; }
        // Foreign key
        public int? BrandFId { get; set; }
        public int? ProductCategoryFId { get; set; }

        // Navigation property
        public virtual Brand? Brand { get; set; }
        public virtual ProductCategory? ProductCategory { get; set; }

    }
}

