using System;
namespace API.Models
{
	public class ShelfDTO
	{
        public int Id { get; set; }
        public required string ShelfName { get; set; }
        public required int Face { get; set; }
        public required int Row { get; set; }
        public required int Column { get; set; }
    }
}

