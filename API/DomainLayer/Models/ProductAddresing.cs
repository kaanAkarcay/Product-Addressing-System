using System;
using DomainLayer.SeedWork;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DomainLayer.Models
{
	public class ProductAddresing: Entity
	{
		[Key]
		public int ProductAddresingId { get; set; }
		public int Quantity { get; set; }
		public required string AddressedBy { get; set; }
		public required DateTime AddressedTime { get; set; }
		public required string AddressCode { get; set; }
		public string? PickedBy { get; set; }
		public DateTime? PickedTime { get; set; }
		public required bool IsDeleted { get; set; }

        
        //Foreign keys
        public required long ProductFId { get; set; }
		public required int AddressFId { get; set; }


        //Navigation properties
        public required Product Product { get; set; }
		public required Address Address { get; set; }

    }
}

