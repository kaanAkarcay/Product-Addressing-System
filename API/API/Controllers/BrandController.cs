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
    public class BrandController: ControllerBase
	{
        private readonly BrandService _brandService;

        public BrandController(BrandService brandService)
        {
            _brandService = brandService;
        }


        [HttpGet("getBrand", Name = "getBrand")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<string>>> getBrand(string name)
        {
            var brand = await _brandService.FindBrandByNameAsync(name);
            if (brand == null)
            {
                ModelState.AddModelError("", "brand is not exists!!");
                return BadRequest(ModelState);
            }

            return Ok(_brandService.MapBrandEntityToDtoJson(brand));
        }

        [HttpGet("getBrands")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<List<string>>>> getBrands()
        {
            List<Brand> fetchedBrands = await _brandService.FindBrandsAsync();
            if (fetchedBrands == null)
            {
                ModelState.AddModelError("", "error at fetching Brands!!");
                return BadRequest(ModelState);
            }
            return Ok(_brandService.MapBrandEntitiesToDtoJsons(fetchedBrands));
        }

        [HttpDelete("deleteBrand")]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<string>>> deleteBrand(string name)
        {
            var brand = await _brandService.FindBrandByNameAsync(name);
            if (brand == null)
            {
                ModelState.AddModelError("", "brand is not exists!!");
                return BadRequest(ModelState);
            }
            if (await _brandService.DeleteAsync(brand))
            {
                return Ok(_brandService.MapBrandEntityToDtoJson(brand));
            }
            else
            {
                ModelState.AddModelError("", "error at Deleting brand!!");
                return BadRequest(ModelState);

            }
        }
        [HttpPut("updateBrand")]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<IEnumerable<string>>> updateBrand(BrandDTO newBrand)
        {
            var brand = await _brandService.FindBrandByNameAsync(newBrand.BrandName);
            if (brand == null)
            {
                ModelState.AddModelError("", "brand is not exists!!");
                return BadRequest(ModelState);
            }

            brand.BrandName = newBrand.BrandName;
            if (await _brandService.UpdateAsync(brand))
            {
                return Ok(_brandService.MapBrandEntityToDtoJson(brand));
            }
            else
            {
                ModelState.AddModelError("", "error at updating brand!!");
                return BadRequest(ModelState);

            }
        }

        [HttpPost("createBrand")]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<Brand>> createBrand( BrandDTO brand)
        {
            if (brand == null)
            {
                return BadRequest(brand);
            }
            string brandDtoJson = JsonConvert.SerializeObject(brand);
            var Mbrand =  _brandService.MapBrandDtoToEntity(brandDtoJson);
            if (Mbrand == null)
            {
                ModelState.AddModelError("", "ivalid input!!");
                return BadRequest(ModelState);
            }

            if (await _brandService.CreateAsync(Mbrand))
                return Ok(Mbrand);
            else
            {
                ModelState.AddModelError("", "Failed to create brand!!");
                return BadRequest(ModelState);
            }

            //return CreatedAtRoute("getProduct", new { id = product.Barcode }, product);
        }

    }
}

