using System;


namespace API.Models
{
	public class AdressDTO
	{
        public int Id { get; set; }
        public required string AdressBarcode { get; set; }
        public int ProductAmount { get; set; }
        public int Row { get; set; }//5
        public int Column { get; set; }//10
        public int Face { get; set; }

        //Foreign keys
        public long? ProductBarcode { get; set; }
        public int? ShelfName { get; set; }

    }
}

