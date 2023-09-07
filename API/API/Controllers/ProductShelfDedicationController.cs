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


        public ProductShelfDedicationController(ProductShelfDedicationService productShelfDedicationService)
        {
            _productShelfDedicationService = productShelfDedicationService;
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
