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


// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase 
    {

        private readonly ProductService _productService;
       

        public ProductController(ProductService productService)
        {
            _productService = productService;
         
        }

        [HttpGet("getProduct", Name = "getProduct")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<string>>> getProduct(long barcode)
        {
            var product =await _productService.FindProductAsync(barcode);
            if(product == null)
            {
                 ModelState.AddModelError("", "product is not exists!!");
                return BadRequest(ModelState);
            }
            
            return Ok(_productService.MapProductEntityToDtoJson(product));
        }

        [HttpGet ("getProducts")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<List<string>>>> getProducts()
            {
            List<Product> fetchedProducts =await _productService.FindProductsAsync();
            if(fetchedProducts == null)
            {
                ModelState.AddModelError("", "error at fetching products!!");
                return BadRequest(ModelState);
            }
                return Ok(_productService.MapProductEntitiesToDtoJson(fetchedProducts));
            }

        [HttpDelete("deleteProduct")]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<string>>> deleteProduct(long barcode)
        {
            var product = await _productService.FindProductAsync(barcode);
            if (product == null)
            {
                ModelState.AddModelError("", "product is not exists!!");
                return BadRequest(ModelState);
            }
            if (await _productService.DeleteAsync(product))
            {
                return Ok(_productService.MapProductEntityToDtoJson(product));
            }
            else
            {
                ModelState.AddModelError("", "error at Deleting product!!");
                return BadRequest(ModelState);

            }
        }
        [HttpPut ("updateProduct")]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<IEnumerable<string>>> updateProduct(ProductDTO newProduct)
        {
            var product = await _productService.FindProductAsync(newProduct.Barcode);
            var newBrand = await _productService.GetBrandAsync(newProduct.Brand);
            var newProductCategory = await _productService.GetProductCategoryAsync(newProduct.ProductCategory);
            if (product == null)
            {
                ModelState.AddModelError("", "product is not exists!!");
                return BadRequest(ModelState);
            }
            product.ProductName = newProduct.ProductName;
            product.Sex = newProduct.Sex;
            product.Brand = newBrand;
            product.BrandFId = newBrand.BrandId;
            product.ProductCategory = newProductCategory;
            product.ProductCategoryFId = newProductCategory.ProductCategoryId;
            
            if (await _productService.UpdateAsync(product))
            {
                return Ok(_productService.MapProductEntityToDtoJson(product));
            }
            else
            {
                ModelState.AddModelError("", "error at updating product!!");
                return BadRequest(ModelState);

            }
        }
        [HttpPost ("createProduct")]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<ProductDTO>> createProduct(ProductDTO product)
        {

            if (product == null)
            {
                return BadRequest(product);
            }

            //IT DOESNT CHECK FOR ALREADY EXISTING PRODUCTS
            string productDtoJson = JsonConvert.SerializeObject(product);

            var Mproduct = await _productService.MapProductDtoToEntityAsync(productDtoJson);
            
            if (Mproduct == null)
            {
                ModelState.AddModelError("", "brand or category is not exists!!");
                return BadRequest(ModelState);
            }


            if (await _productService.CreateAsync(Mproduct))
                return CreatedAtRoute("getProduct", new { barcode = Mproduct.Barcode }, Mproduct);
            //return Ok(product);
            //ProductDTO productDTO = JsonConvert.DeserializeObject<ProductDTO>(product);
            else
            {
                ModelState.AddModelError("", "failed to create!!");
                return BadRequest(ModelState);
            }

            //return CreatedAtRoute("getProduct", new { id = product.Barcode }, product);
        }
    }
}

