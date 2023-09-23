using System;
using System.ComponentModel.DataAnnotations;

namespace DomainLayer.SeedWork
{
	public abstract class Entity
	{
        [Key]
        public int Id { get; set; }
	}
}

