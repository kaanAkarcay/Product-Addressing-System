using System;
using DomainLayer.Models;

namespace API.Models
{
	public class ProductShelfDedicationDTO
	{
        public int Id { get; set; }
        public string? Sex { get; set; }
        public int? Face { get; set; }
        public int? Row { get; set; }
        public int? Column { get; set; }



        //FId
        public required string ShelfName { get; set; }
        public required string BrandName { get; set; }
        public string? ProductCategoryName { get; set; }
       
    }
}

