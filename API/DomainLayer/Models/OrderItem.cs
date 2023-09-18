using System;
using System.ComponentModel.DataAnnotations;
using DomainLayer.SeedWork;

namespace DomainLayer.Models
{
    public class OrderItem : Entity
    {
        [Key]
        public int OrderItemId { get; set; }
        public required long ProductBarcode { get; set; }
        public DateTime? CompletionDate { get; set; }
        public required int Status { get; set; }

        // Foreign key
        public required int OrderFId { get; set; }


        // Navigation property
        public virtual required Order Order { get; set; }

    }
}

