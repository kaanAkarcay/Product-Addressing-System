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
    public class ProductAdressingController: ControllerBase
	{
		private readonly ProductAddressingService _productAddressingService;
        private readonly ProductShelfDedicationService _productShelfDedicationService;
        private readonly ProductService _productService;
        private readonly AddressService _addressService;
        public ProductAdressingController(ProductAddressingService productAddressingService, ProductService productService, AddressService addressService, ProductShelfDedicationService productShelfDedicationService)
		{
            _productShelfDedicationService = productShelfDedicationService;
            _addressService = addressService;
            _productService = productService;
			_productAddressingService = productAddressingService;
		}

        [HttpGet("getRequest", Name = "getRequest")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<string>>> getRequest(long barcode)
        {
            var product = await _productService.FindProductAsync(barcode);
            if (product == null)
            {
                return BadRequest(product);
            }
            //string productDtoJson = JsonConvert.SerializeObject(product);
            //var Mproduct = await _productService.MapProductDtoToEntityAsync(productDtoJson);
            var result = await _productShelfDedicationService.LookForRequestAsync(product);
            return Ok(result);
            //var result = _productAddressingService.getRequestForProduct(Mproduct);

            //if (string.IsNullOrEmpty(result))
            //{
            //    ModelState.AddModelError("", "Non-Pre Defined suggestions");
            //    return BadRequest(ModelState);
            //}

            //else
            //{
            //    return Ok(result);
            //}

        }


        [HttpPut("removeProduct")]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<IEnumerable<string>>> removeProduct(ProductRemovalWrapperDTO input)
        {
            var product = await _productService.FindProductAsync(input.ProductBarcode);
            if (product == null)
            {
                return BadRequest(product);
            }
            var existingAdress = await _productAddressingService.GetProductAddressingByAddressCodeAsync(input.Address);

            //if adress is not EMPTY!
            if (existingAdress != null)
            {
                if (input.ProductBarcode != existingAdress.ProductFId)
                {
                    ModelState.AddModelError("", "product barcodes does not match!!");
                    return BadRequest(ModelState);
                }

                if (input.Quantity > existingAdress.Quantity)
                {
                    ModelState.AddModelError("", "there isn't enough product stored!!");
                    return BadRequest(ModelState);
                }
                else
                {
                    if(input.Quantity == existingAdress.Quantity)
                    {
                        existingAdress.IsDeleted = true;
                        existingAdress.PickedBy = input.PickedBy;
                        existingAdress.PickedTime = DateTime.UtcNow;
                        if (await _productAddressingService.UpdateAsync(existingAdress))
                            return Ok(_productService.MapProductEntityToDtoJson(product));
                        else
                        {

                            ModelState.AddModelError("", "error at deleting addressing!!");
                            return BadRequest(ModelState);
                        }
                    }
                    existingAdress.Quantity -= input.Quantity;
                    existingAdress.PickedBy = input.PickedBy;
                    existingAdress.PickedTime = DateTime.UtcNow;
                    if (await _productAddressingService.UpdateAsync(existingAdress))
                    {
                        var p = _productService.MapProductEntityToDtoJson(product);
                        return Ok(p);
                    }
                    else
                    {
                        ModelState.AddModelError("", "error at removing  products from adress");
                        return BadRequest(ModelState);
                    }

                }

            }

            ModelState.AddModelError("", "there is no product addressing as scpecified!!");
            return BadRequest(ModelState);

        }



        [HttpPost("insertProduct", Name = "insertProduct")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<IEnumerable<string>>> insertProduct(ProductInsertionWrapperDTO input)
    {
            var product = await _productService.FindProductAsync(input.ProductBarcode);
            if (product == null)
            {
                return BadRequest(product);
            }
            var existingAdress = await _productAddressingService.GetProductAddressingByAddressCodeAsync(input.Address);

            //if adress is not EMPTY!
            if (existingAdress!=null)
            {
               
                if (input.ProductBarcode != existingAdress.ProductFId)
                {
                    ModelState.AddModelError("", "YOU CANNOT INSERT DIFFERENT PRODUCTS AT SAME ADRESS");
                    return BadRequest(ModelState);
                }
                existingAdress.Quantity += input.Quantity;
                if(await _productAddressingService.UpdateAsync(existingAdress))
                {
                    var p = _productService.MapProductEntityToDtoJson(product);
                    return Ok(p);
                }
                else
                {
                    ModelState.AddModelError("", "error at inserting extra products to adress");
                    return BadRequest(ModelState);
                }
            }
  
           
           

            var address = await _addressService.GetAddressByAddressCodeAsync(input.Address);
            

            if(await _productAddressingService.CreateAsync(new ProductAddresing
            {
                Quantity = input.Quantity,
                AddressedBy = input.AddressedBy,
                AddressedTime = DateTime.UtcNow,
                AddressCode = address.AdressBarcode,
                ProductFId = product.Barcode,
                AddressFId = address.AddressId, // Assuming Address has a property called AddressId
                IsDeleted = false, // Assuming default value is false for a new entry
                Product = product, // If your service method does not populate navigation properties, you might need to fetch the Product from the database first
                Address = address
            }))
            {
                var p = _productService.MapProductEntityToDtoJson(product);
                return Ok(p);
            }
            else
            {
                ModelState.AddModelError("", "error at insertsion");
                return BadRequest(ModelState);
            }

        }
}
}

