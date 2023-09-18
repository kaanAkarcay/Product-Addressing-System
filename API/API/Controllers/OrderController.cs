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
    public class OrderController: ControllerBase
	{
		private readonly OrderService _orderService;
        private readonly OrderItemService _orderItemService;
		public OrderController(OrderService orderService, OrderItemService orderItemService)
		{
			_orderService = orderService;
            _orderItemService = orderItemService;
		}

        [HttpGet("getOrder", Name = "getOrder")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<string>>> getOrder(string OrderCode)
        {
            var order = await _orderService.FindOrderByCodeAsync(OrderCode);
            if (order == null)
            {
                ModelState.AddModelError("", "Order is not exists!!");
                return BadRequest(ModelState);
            }

            return Ok(_orderService.MapOrderEntityToDtoJson(order));
        }


        [HttpGet("getOrders", Name = "getOrders")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<string>>> getOrders()
        {
            var orders = await _orderService.FindAllOrdersAsync();
            if (orders == null)
            {
                ModelState.AddModelError("", "Order is not exists!!");
                return BadRequest(ModelState);
            }

            return Ok(_orderService.MapOrdersToDtoJson(orders));
        }

        [HttpPatch("startOrder", Name = "startOrder")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<string>>> startOrder(string OrderCode)
        {
            var order = await _orderService.FindOrderByCodeAsync(OrderCode);
            if (order == null)
            {
                ModelState.AddModelError("", "Order is not exists!!");
                return BadRequest(ModelState);
            }
            order.Status = 1;
            if (await _orderService.UpdateAsync(order))
            {
                return Ok(_orderService.MapOrderEntityToDtoJson(order));

            }
            else
            {
                ModelState.AddModelError("", "could not update order!!");
                return BadRequest(ModelState);
            }

        }





        [HttpPost("createOrder", Name = "createOrder")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<string>>> createOrder(OrderWrapperDTO Order)
        {
            var orders = await _orderService.FindAllOrdersAsync();
            string orderDtoJson = JsonConvert.SerializeObject(Order);

            if (Order == null)
            {
                return BadRequest();
            }
            var order = _orderService.MapOrderDtoToEntity(orderDtoJson,orders);
            if(!await _orderService.CreateAsync(order))
            {
                ModelState.AddModelError("", "Order failed to created!!");
                return BadRequest(ModelState);
            }
            order = await _orderService.FindOrderByCodeAsync(order.OrderCode);
            var orderItems = await _orderItemService.CreateOrderItemsAsync(Order.ProductBarcodes, order);
            order.OrderItems = orderItems;

            if (await _orderService.UpdateAsync(order))
            {

                return Ok(_orderService.MapOrderEntityToDtoJson(order));
            }
            else
            {
                ModelState.AddModelError("", "Order items failed to created!!");
                return BadRequest(ModelState);
            }


        }

        [HttpPatch("finishOrder", Name = "finishOrder")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<string>>> finishOrder(string OrderCode)
        {
            var order = await _orderService.FindOrderByCodeAsync(OrderCode);
            if(order == null)
            {
                ModelState.AddModelError("", "Order cannot be found!!");
                return BadRequest(ModelState);
            }
            order.Status = 2;
            order.FinishedDate = DateTime.UtcNow;

            if (await _orderService.UpdateAsync(order))
            {

                return Ok(_orderService.MapOrderEntityToDtoJson(order));
            }
            else
            {
                ModelState.AddModelError("", "failed to finish order!!");
                return BadRequest(ModelState);
            }



        }



    }
}

