using System;
using DomainLayer.SeedWork;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DomainLayer.Models
{
    public class Address : Entity
    {
   
        public required string AdressBarcode { get; set; }
        public int ProductAmount { get; set; }
        public required int Row { get; set; }
        public required int Column { get; set; }
        public required int Face { get; set; }

        //Foreign keys
        public required int ShelfFId { get; set; }

        //Navigation properties
       public virtual required Shelf Shelf { get; set; }
    }
}

