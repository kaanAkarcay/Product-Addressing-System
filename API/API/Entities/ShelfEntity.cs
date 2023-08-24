using System.ComponentModel.DataAnnotations;
namespace API.Entities
{
	public class ShelfEntity
    {
		[Key]
		public required string Shelf_ID { get; set; }
		

		public required ICollection<AdressEntity> Adresses { get; set; }
	}
}

