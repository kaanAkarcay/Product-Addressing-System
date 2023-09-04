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

        public async Task<Shelf> GetShelfAsync(string shelfId)
        {
            return await _uow.ShelfRepository.FindByShelfIdAsync(shelfId);
        }

        // Map single Shelf entity to DTO in JSON format
        public string MapShelfEntityToDtoJson(Shelf shelf)
        {
            if (shelf == null)
                return null;

            JObject jsonObject = new JObject
            {
                ["ShelfId"] = shelf.ShelfId
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
                    ["ShelfId"] = shelf.ShelfId
                };
                shelfDtoJsons.Add(jsonObject.ToString());
            }

            return shelfDtoJsons;
        }

        // Map a Shelf DTO in JSON format to a Shelf entity
        public Shelf MapShelfDtoToEntity(string shelfDtoJson)
        {
            JObject jsonObject = JObject.Parse(shelfDtoJson);

            string shelfId = jsonObject.GetValue("ShelfId").Value<string>();

            if (string.IsNullOrEmpty(shelfId))
                return null;

            return new Shelf
            {
                ShelfId = shelfId
            };
        }

    }
}

