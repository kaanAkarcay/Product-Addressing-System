using System;
using DomainLayer.Services;
using API.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DomainLayer.Models;
namespace API.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class BrandController: ControllerBase
	{
  //      private readonly BrandService _brandService;

  //      public BrandController(BrandService brandService)
		//{
  //          _brandService = brandService;
		//}


  //      [HttpPost]
  //      [ProducesResponseType(StatusCodes.Status500InternalServerError)]
  //      [ProducesResponseType(StatusCodes.Status400BadRequest)]
  //      [ProducesResponseType(StatusCodes.Status201Created)]
  //      public async Task<ActionResult<Brand>> createbrand([FromBody] string brand)
  //      {
  //          if (string.IsNullOrEmpty(brand))
  //          {
  //              return BadRequest(brand);
  //          }
          
  //          var Mbrand = await _brandService.MapProductDtoToEntityAsync(brand);
  //          if (Mbrand == null)
  //          {
  //              ModelState.AddModelError("", "brand or category is not exists!!");
  //              return BadRequest(ModelState);
  //          }


  //          await _brandService.CreateAsync(Mbrand);
  //          return Ok(Mbrand);
  //          //return CreatedAtRoute("getProduct", new { id = product.Barcode }, product);
  //      }

    }
}

