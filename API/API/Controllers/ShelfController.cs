using System;
using DomainLayer.Services;
using API.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DomainLayer.Models;
using Newtonsoft.Json;
namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ShelfController: ControllerBase
	{
		private readonly ShelfService _shelfService;
		public ShelfController(ShelfService shelfService)
		{
			_shelfService = shelfService;
		}

        [HttpGet("getShelf", Name = "getShelf")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<string>>> getShelf(string shelfName)
        {
            var shelf = await _shelfService.GetShelfByNameAsync(shelfName);
            if (shelf == null)
            {
                ModelState.AddModelError("", "shelf is not exists!!");
                return BadRequest(ModelState);
            }

            return Ok(_shelfService.MapShelfEntityToDtoJson(shelf));
        }

        [HttpDelete("deleteShelf")]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<string>>> deleteShelf(string shelfName)
        {
            var shelf = await _shelfService.GetShelfByNameAsync(shelfName);
            if (shelf == null)
            {
                ModelState.AddModelError("", "shelf is not exists!!");
                return BadRequest(ModelState);
            }
            if (await _shelfService.DeleteAsync(shelf))
            {
                return Ok(_shelfService.MapShelfEntityToDtoJson(shelf));
            }
            else
            {
                ModelState.AddModelError("", "error at Deleting shelf!!");
                return BadRequest(ModelState);

            }
        }

        [HttpPut("updateShelf")]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<IEnumerable<string>>> updateShelf(ShelfDTO newShelf)
        {
            //var shelf = await _shelfService.GetShelfByNameAsync(newShelf.ShelfName);
            var shelf = await _shelfService.FindShelfById(newShelf.Id);
            if (shelf == null)
            {
                ModelState.AddModelError("", "Shelf is not exists!!");
                return BadRequest(ModelState);
            }

           
            shelf.ShelfName = newShelf.ShelfName;
            shelf.Face = newShelf.Face;
            shelf.Row = newShelf.Row;
            shelf.Column = newShelf.Column;
            if (await _shelfService.UpdateAsync(shelf))
            {
                return Ok(_shelfService.MapShelfEntityToDtoJson(shelf));
            }
            else
            {
                ModelState.AddModelError("", "error at updating Shelf!!");
                return BadRequest(ModelState);

            }
        }

        [HttpPost("createShelf")]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<Brand>> createShelf(ShelfDTO shelf)
        {
            if (shelf == null)
            {
                return BadRequest(shelf);
            }
            string ShelfDtoJson = JsonConvert.SerializeObject(shelf);
            var MShelf = _shelfService.MapShelfDtoToEntity(ShelfDtoJson);
            if (MShelf == null)
            {
                ModelState.AddModelError("", "ivalid input!!");
                return BadRequest(ModelState);
            }
            //await _shelfService.CreateAsync(MShelf)
            if (await _shelfService.CreateShelfWithAdresses(MShelf))
                return Ok(MShelf);
            else
            {
                ModelState.AddModelError("", "Failed to create Shelf!!");
                return BadRequest(ModelState);
            }

            //return CreatedAtRoute("getProduct", new { id = product.Barcode }, product);
        }

    }
}

