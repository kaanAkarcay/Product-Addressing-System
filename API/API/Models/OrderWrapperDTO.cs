using System;
using System.ComponentModel.DataAnnotations;

namespace API.Models
{
	public class OrderWrapperDTO
	{
        public int Id { get; set; }
        public required int OrderType { get ; set ;}
		public string? AssignedTo { get; set; }
		public string? OrderCode { get; set; }

		public required List<long> ProductBarcodes { get; set; }

	}
}

