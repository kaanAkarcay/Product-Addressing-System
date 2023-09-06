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

using System;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductCategoryController: ControllerBase
	{
		private readonly ProductCategoryService _productCategoryService;
		public ProductCategoryController(ProductCategoryService productCategoryService)
		{
			_productCategoryService = productCategoryService;
		}

        [HttpGet("getProductCategory", Name = "getProductCategory")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<string>>> getProductCategory(string name)
        {
            var productCategory = await _productCategoryService.FindProductCategoryByNameAsync(name);
            if (productCategory == null)
            {
                ModelState.AddModelError("", "Product Category is not exists!!");
                return BadRequest(ModelState);
            }

            return Ok(_productCategoryService.MapProductCategoryEntityToDtoJson(productCategory));
        }

        [HttpGet("getProductCategories")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<List<string>>>> getProductCategories()
        {
            List<ProductCategory> fetchedproductCategories = await _productCategoryService.FindProductCategoriesAsync();
            if (fetchedproductCategories == null)
            {
                ModelState.AddModelError("", "error at fetching Product Categorys!!");
                return BadRequest(ModelState);
            }
            return Ok(_productCategoryService.MapProductCategoryEntitiesToDtoJsons(fetchedproductCategories));
        }

        [HttpDelete("deleteProductCategory")]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<string>>> deleteProductCategory(string name)
        {
            var productCategory = await _productCategoryService.FindProductCategoryByNameAsync(name);
            if (productCategory == null)
            {
                ModelState.AddModelError("", "Product Category is not exists!!");
                return BadRequest(ModelState);
            }
            if (await _productCategoryService.DeleteAsync(productCategory))
            {
                return Ok(_productCategoryService.MapProductCategoryEntityToDtoJson(productCategory));
            }
            else
            {
                ModelState.AddModelError("", "error at Deleting Product Category!!");
                return BadRequest(ModelState);

            }
        }
        [HttpPut("updateProductCategory")]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<IEnumerable<string>>> updateProductCategory(ProductCategoryDTO newProductCategory)
        {
            var productCategory = await _productCategoryService.FindProductCategoryByNameAsync(newProductCategory.ProductsCategoryName);
            if (productCategory == null)
            {
                ModelState.AddModelError("", "Product Category is not exists!!");
                return BadRequest(ModelState);
            }

            productCategory.ProductsCategoryName = newProductCategory.ProductsCategoryName;
            if (await _productCategoryService.UpdateAsync(productCategory))
            {
                return Ok(_productCategoryService.MapProductCategoryEntityToDtoJson(productCategory));
            }
            else
            {
                ModelState.AddModelError("", "error at updating Product Category!!");
                return BadRequest(ModelState);

            }
        }

        [HttpPost("createProductCategory")]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<Brand>> createProductCategory(ProductCategoryDTO productCategory)
        {
            if (productCategory == null)
            {
                return BadRequest(productCategory);
            }
            string productCategoryDtoJson = JsonConvert.SerializeObject(productCategory);
            var MproductCategory = _productCategoryService.MapProductCategoryDtoToEntity(productCategoryDtoJson);
            if (MproductCategory == null)
            {
                ModelState.AddModelError("", "ivalid input!!");
                return BadRequest(ModelState);
            }

            if (await _productCategoryService.CreateAsync(MproductCategory))
                return Ok(MproductCategory);
            else
            {
                ModelState.AddModelError("", "Failed to create Product Category!!");
                return BadRequest(ModelState);
            }

            //return CreatedAtRoute("getProduct", new { id = product.Barcode }, product);
        }

    }
}


