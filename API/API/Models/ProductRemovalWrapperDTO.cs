using System;
using System.ComponentModel.DataAnnotations;

namespace API.Models
{
	public class ProductRemovalWrapperDTO
	{
        [Range(1000000000000, 9999999999999)]
        public required long ProductBarcode { get; set; }
        public required string Address { get; set; }
        public required string PickedBy { get; set; }
        public required int Quantity { get; set; }
    }
}

