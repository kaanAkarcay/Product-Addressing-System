using System;
using API.Data;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using API.Models.DTO;
using Microsoft.EntityFrameworkCore;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly APIDbContext _context;
        public ProductController(APIDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<ProductDTO>> getProducts()
        {
            return Ok(DataStore.products);
        }



        [HttpGet("{id:long}", Name= "getProduct")]
        //[ProducesResponseType(200, Type=typeof(ProductDTO))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        // [HttpGet(Name = "GetWeatherForecast")]
        public ActionResult<ProductDTO> getProduct(int id)
        {
            if (id == 0)
            {
                return BadRequest();
            }
            var product = DataStore.products.FirstOrDefault(u => u.Barcode == id);
            if (product == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(product);
            }
        }



        [HttpPost]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public ActionResult<ProductDTO> createProduct([FromBody]ProductDTO product)
        {
            if (product == null)
            {
                return BadRequest(product);
            }
            //if (product.Barcode < 100000)//invalid barcode
            //{
            //    return StatusCode(StatusCodes.Status500InternalServerError);
            //}
            if (DataStore.products.FirstOrDefault(u => u.Barcode == product.Barcode) != null)
            {
                ModelState.AddModelError("", "That Product is already exists!!");
                return BadRequest(ModelState);
            }
                if (DataStore.products.FirstOrDefault(u=>u.Product_Name.ToLower() == product.Product_Name.ToLower() ) != null)
            {
                ModelState.AddModelError("", "A Product with that name already exists!!");
                return BadRequest(ModelState);
            }
            DataStore.products.Add(product);
            //return Ok(product);
            return CreatedAtRoute("getProduct",new { id = product.Barcode },product);
        }
    }
}

