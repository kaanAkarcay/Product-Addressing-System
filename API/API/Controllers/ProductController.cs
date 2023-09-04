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
      

        [HttpGet (Name= "getProducts")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<IEnumerable<List<Product>>> getProducts()
            {
                return Ok(_productService.FindProductsAsync);
            }




        [HttpPost ("createProduct")]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<ProductDTO>> createProduct(ProductDTO product)
        {
            Console.WriteLine("before parse *controller");
            if (product == null)
            {
                return BadRequest(product);
            }

            Console.WriteLine("before parse *controller");
            string productDtoJson = JsonConvert.SerializeObject(product);
            Console.WriteLine("Input is:"+productDtoJson);
            var Mproduct = await _productService.MapProductDtoToEntityAsync(productDtoJson);
            Console.WriteLine("after parse *controller");   
            //if (Mproduct == null) 
            //{
            //    ModelState.AddModelError("", "brand or category is not exists!!");
            //    return BadRequest(ModelState);
            //}


            if(await _productService.CreateAsync(Mproduct))
                return Ok(product);
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

