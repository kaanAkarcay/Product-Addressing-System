using System;
using System.ComponentModel.DataAnnotations;
using DomainLayer.SeedWork;

namespace DomainLayer.Models
{
	public class Adress : Entity
    {
        [Key]
        public required string AdressBarcode { get; set; }
        public int ProductAmount { get; set; }
        public int Row { get; set; }//5
        public int Column { get; set; }//10
        public int Face { get; set; }

        //Foreign keys
        public long? ProductBarcode { get; set; }
        public string? ShelfId { get; set; }

        //Navigation properties
        public Product? Product { get; set; }
        public  Shelf? Shelf { get; set; }
    }
}

