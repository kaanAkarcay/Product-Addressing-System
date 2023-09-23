using System;
using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class ProductInsertionWrapperDTO
    {
        public int Id { get; set; }
        [Range(1000000000000, 9999999999999)]
        public required long ProductBarcode { get; set; }
        public required string Address { get; set; }
        public required string AddressedBy { get; set; }
        public required int Quantity { get; set; }

    }

}

