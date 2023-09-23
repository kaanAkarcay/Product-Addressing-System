using System;
using System.ComponentModel.DataAnnotations;
using DomainLayer.SeedWork;

namespace DomainLayer.Models
{
    public class Shelf : Entity
    {

        public required string ShelfName { get; set; }
        public required int Face { get; set; }
        public required int Row {get; set;}
        public required int Column { get; set; }
        //public Address address { get; set; }



        public required ICollection<Address> Addresses { get; set; }
    }
}

