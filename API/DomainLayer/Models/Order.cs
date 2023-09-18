using System;
using System.ComponentModel.DataAnnotations;
using DomainLayer.SeedWork;

namespace DomainLayer.Models
{
    public class Order : Entity
    {
        [Key]
        public int OrderId { get; set; }
        public required string OrderCode { get; set; }
        public required int OrderType { get; set; }
        public string? AssignedTo { get; set; }
        public required DateTime CreationDate { get; set; }
        public DateTime? AssignedDate { get; set; }
        public DateTime? FinishedDate { get; set; }
        public required int Status { get; set; }


        // Navigation property for related TaskItems
        public ICollection<OrderItem>? OrderItems { get; set; }
    }
}

