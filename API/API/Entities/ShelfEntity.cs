namespace API.Entities
{
	public class ShelfEntity
    {
		public required string Shelf_ID { get; set; }
		

		public required ICollection<AdressEntity> Adresses { get; set; }
	}
}

