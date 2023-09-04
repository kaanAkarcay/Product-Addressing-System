using System;
using System.ComponentModel.DataAnnotations;
using DomainLayer.SeedWork;

namespace DomainLayer.Models
{
	public class Shelf : Entity
    {
        [Key]
        public required string ShelfId { get; set; }


        public  ICollection<Adress>? Adresses { get; set; }
    }
}

