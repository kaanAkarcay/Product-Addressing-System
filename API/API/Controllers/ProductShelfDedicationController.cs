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
    public class ProductShelfDedicationController : ControllerBase
    {
        private readonly ProductShelfDedicationService _productShelfDedicationService;
        private readonly ProductCategoryService _productCategoryService;


        public ProductShelfDedicationController(ProductShelfDedicationService productShelfDedicationService, ProductCategoryService productCategoryService)
        {
            _productCategoryService = productCategoryService;
            _productShelfDedicationService = productShelfDedicationService;
        }


        [HttpGet("getProductShelfDedication", Name = "getProductShelfDedication")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<string>>> getProductShelfDedication(int id)
        {
            var ProductShelfDedication = await _productShelfDedicationService.FindProductShelfDedicationById(id);
            if (ProductShelfDedication == null)
            {
                ModelState.AddModelError("", "ProductShelfDedication is not exists!!");
                return BadRequest(ModelState);
            }

            return Ok(await _productShelfDedicationService.ProductShelfDedicationEntityToDTO(ProductShelfDedication)); 
        }

        [HttpGet("getProductShelfDedications")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<List<string>>>> getProductShelfDedications()
        {
            List<ProductShelfDedication> fetchedProductShelfDedication = await _productShelfDedicationService.FindAllProductShelfDedications();
            if (fetchedProductShelfDedication == null)
            {
                ModelState.AddModelError("", "error at fetching ProductShelfDedications!!");
                return BadRequest(ModelState);
            }
            return Ok(await _productShelfDedicationService.ProductShelfDedicationsToDTOList(fetchedProductShelfDedication));
        }

        [HttpDelete("deleteProductShelfDedication")]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<string>>> deleteProductShelfDedication(int id)
        {
            var ProductShelfDedication = await _productShelfDedicationService.FindProductShelfDedicationById(id);
            if (ProductShelfDedication == null)
            {
                ModelState.AddModelError("", "ProductShelfDedication is not exists!!");
                return BadRequest(ModelState);
            }
            if (await _productShelfDedicationService.DeleteAsync(ProductShelfDedication))
            {
                return Ok(_productShelfDedicationService.ProductShelfDedicationEntityToDTO(ProductShelfDedication));
            }
            else
            {
                ModelState.AddModelError("", "error at Deleting ProductShelfDedication!!");
                return BadRequest(ModelState);

            }
        }
        [HttpPut("updateProductShelfDedication")]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<IEnumerable<string>>> updateProductShelfDedication(ProductShelfDedicationDTOwID newProductShelfDedication)
        {
            var oldProductShelfDedication = await _productShelfDedicationService.FindProductShelfDedicationById(newProductShelfDedication.Id);
            ProductCategory? productCategory = null;
            if(oldProductShelfDedication.ProductCategoryFId!=null)
            productCategory = await _productCategoryService.FindProductCategoryByIdAsync((int)oldProductShelfDedication.ProductCategoryFId);
            var pcId = productCategory?.ProductCategoryId ?? null;
            if (oldProductShelfDedication == null)
            {
                ModelState.AddModelError("", "ProductShelfDedication is not exists!!");
                return BadRequest(ModelState);
            }
            oldProductShelfDedication.Column = newProductShelfDedication.Column;
            oldProductShelfDedication.Face = newProductShelfDedication.Face;
            oldProductShelfDedication.Row = newProductShelfDedication.Row;
            oldProductShelfDedication.Sex = newProductShelfDedication.Sex;
            oldProductShelfDedication.ProductCategory = productCategory;
            oldProductShelfDedication.ProductCategoryFId = pcId;
            if (await _productShelfDedicationService.UpdateAsync(oldProductShelfDedication))
            {
                return Ok(_productShelfDedicationService.ProductShelfDedicationEntityToDTO(oldProductShelfDedication));
            }
            else
            {
                ModelState.AddModelError("", "error at updating ProductShelfDedication!!");
                return BadRequest(ModelState);

            }
        }
        [HttpPost("createProductShelfDedication")]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<string>> createProductShelfDedication(ProductShelfDedicationDTO productShelfDedication)
        {

            if (productShelfDedication == null)
            {
                return BadRequest();
            }

            string dedicationDtoJson = JsonConvert.SerializeObject(productShelfDedication);
            var dedicationToBeCreated = await _productShelfDedicationService.CreateDedicationAsync(dedicationDtoJson);
            if (dedicationToBeCreated == null)
            {
                ModelState.AddModelError("", "ivalid input, brand and shelf cannot be null!!");
                return BadRequest(ModelState);
            }
            if (await _productShelfDedicationService.CreateAsync(dedicationToBeCreated))
            {
                return Ok(productShelfDedication);
            }
            else
            {
                ModelState.AddModelError("", "error at creating new dedication!!");
                return BadRequest(ModelState);
            }

        }
    }
}
