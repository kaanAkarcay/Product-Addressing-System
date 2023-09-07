using System;
using DomainLayer.SeedWork;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace DomainLayer.Models
{
	public class ProductShelfDedication : Entity
	{
		[Key]
		public int ProductShelfDedicationId { get; set; }
		public string? Sex { get; set; }
		public int? Face { get; set; }
		public int? Row { get; set; }
		public int? Column { get; set; }



		//FId
		public required int ShelfFId { get; set; }
		public required int BrandFId { get; set; }
		public int? ProductCategoryFId { get; set; }
		//nav
		public required Shelf Shelf { get; set; }
		public required Brand Brand { get; set; }
		public ProductCategory? ProductCategory { get; set; }

	}
}