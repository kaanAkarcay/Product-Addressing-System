using System;
using DomainLayer.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
namespace DomainLayer.Services
{
	public class ShelfService: Service<Shelf>
	{
		public ShelfService(IUnitOfWork unitOfWork):base(unitOfWork)
		{
		}

        public async Task<Shelf> GetShelfByNameAsync(string shelfName)
        {
            return await _uow.ShelfRepository.FindByShelfByNameAsync(shelfName);
        }

        public async Task<bool> CreateShelfWithAdresses(Shelf shelf)
        {
            if (_uow.ShelfRepository.Create(shelf))
            {
                await _uow.SaveChangesAsync();//since we are not calling from generic service!
                var createdShelf= await _uow.ShelfRepository.FindByShelfByNameAsync(shelf.ShelfName);


                for (int f = 1; f <= shelf.Face; f++)
                {


                    for (int r = 1; r <= shelf.Row; r++)
                    {
                        for (int c = 1; c <= shelf.Column; c++)
                        {
                            _uow.AddressRepository.Create( new Address {
                                AdressBarcode = $"{createdShelf.ShelfName}-{f:D2}-{r:D2}-{c:D2}",
                                Face= f,
                                Row = r,
                                Column= c,
                                ShelfFId = createdShelf.ShelfId,
                                Shelf = createdShelf



                        });

                        }

                    }
                }
                await _uow.SaveChangesAsync();//since we are not calling from generic service!
                return true;
            }
            return false;
        }

        // Map single Shelf entity to DTO in JSON format
        public string MapShelfEntityToDtoJson(Shelf shelf)
        {
            if (shelf == null)
                return null;

            JObject jsonObject = new JObject
            {
                
                ["ShelfName"] = shelf.ShelfName,
                ["Face"] = shelf.Face,
                ["Row"] = shelf.Row,
                ["Column"] = shelf.Column
            };

            return jsonObject.ToString();
        }

        // Map list of Shelf entities to a list of DTOs in JSON format
        public List<string> MapShelfEntitiesToDtoJsons(List<Shelf> shelves)
        {
            if (shelves == null || !shelves.Any())
                return null;

            List<string> shelfDtoJsons = new List<string>();

            foreach (var shelf in shelves)
            {
                var jsonObject = new JObject
                {
                    
                    ["ShelfName"] = shelf.ShelfName,
                    ["Face"] = shelf.Face,
                    ["Row"] = shelf.Row,
                    ["Column"] = shelf.Column
                };
                shelfDtoJsons.Add(jsonObject.ToString());
            }

            return shelfDtoJsons;
        }

        // Map a Shelf DTO in JSON format to a Shelf entity
        public Shelf MapShelfDtoToEntity(string shelfDtoJson)
        {
            JObject jsonObject = JObject.Parse(shelfDtoJson);

           
            string shelfName = jsonObject.GetValue("ShelfName").Value<string>();
            int face = jsonObject.GetValue("Face").Value<int>();
            int row = jsonObject.GetValue("Row").Value<int>();
            int column = jsonObject.GetValue("Column").Value<int>();
            


            if (string.IsNullOrEmpty(shelfName))
                return null;

            return new Shelf
            {
               
                ShelfName = shelfName,
                Face = face,
                Row = row,
                Column = column,
                Addresses = new List<Address>()
            };
        }



    }
}

