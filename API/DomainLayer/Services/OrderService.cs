using System;
using System.Globalization;
using System.Security.Cryptography;
using DomainLayer.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace DomainLayer.Services
{
	public class OrderService: Service<Order>
	{
		public OrderService(IUnitOfWork unitOfWork) : base(unitOfWork)
		{
		}


        public async Task<Order> FindOrderByCodeAsync(string code)
        {
            return await _uow.OrderRepository.FindByCodeAsync(code);
        }


        public async Task<List<Order>> FindOrdersAsync()
        {
            return await _uow.OrderRepository.FindAllAsync();
        }
        public async Task<List<Order>> FindAllOrdersAsync()
        {
            return await _uow.OrderRepository.FindAllAsync();
        }


        public async Task<string> MapOrderEntityToDtoJson(Order order)
        {
            if (order == null)
                return null;

            var allItems = await _uow.OrderItemRepository.FindAllAsync();
            var filteredItems = allItems.Where(item => item.OrderFId == order.Id).ToList();
            var productBarcodes = filteredItems.Select(item => item.ProductBarcode).ToList();



            JObject jsonObject = new JObject
            {
                ["Id"] = order.Id,
                ["OrderType"] = order.OrderType,
                ["AssignedTo"] = order.AssignedTo ?? string.Empty, // Handle null AssignedTo
                ["OrderCode"] = order.OrderCode ?? string.Empty,
                ["ProductBarcodes"] = new JArray(productBarcodes)
            };

            return jsonObject.ToString();
        }

        public async Task<List<string>>MapOrdersToDtoJson(List<Order> orders)
        {
            if (orders == null || !orders.Any())
                return null;

            var allItems = await _uow.OrderItemRepository.FindAllAsync();

            List<string> ordersJsonArray = new List<string>();

            foreach (var order in orders)
            {
                var filteredItems = allItems.Where(item => item.OrderFId == order.Id).ToList();
                var productBarcodes = filteredItems.Select(item => item.ProductBarcode).ToList();

                JObject orderJsonObject = new JObject
                {
                    ["Id"] = order.Id,
                    ["OrderType"] = order.OrderType,
                    ["AssignedTo"] = order.AssignedTo ?? string.Empty, // Handle null AssignedTo
                    ["OrderCode"] = order.OrderCode ?? string.Empty,
                    ["ProductBarcodes"] = new JArray(productBarcodes)
                };
                var nextString = orderJsonObject.ToString();
                ordersJsonArray.Add(nextString);
            }

            return ordersJsonArray; // Use the Formatting option you prefer
        }
        public string GenerateOrderCode(List<Order> allOrders, int orderType)
        {
            // Filter orders based on orderType
            var filteredOrders = allOrders.Where(order => order.OrderType == orderType);

            // Find the latest order of the specified type
            var latestOrder = filteredOrders
                .OrderByDescending(order => order.OrderCode)
                .FirstOrDefault();

            // Initialize the new order code
            string newOrderCode = "";

            if (latestOrder != null)
            {
                // Extract the numeric part of the latest order code
                string numericPart = latestOrder.OrderCode.Substring(1); // Remove the prefix (P or I)
                if (long.TryParse(numericPart, NumberStyles.Integer, CultureInfo.InvariantCulture, out long numericValue))
                {
                    // Increment the numeric value
                    numericValue++;

                    // Generate the new order code with the appropriate prefix
                    newOrderCode = (orderType == 0 ? "I" : "P") + numericValue.ToString("D13", CultureInfo.InvariantCulture);
                }
            }
            else
            {
                // If no previous order of the specified type exists, start from 1
                newOrderCode = (orderType == 0 ? "I" : "P") + "0000000000001";
            }

            return newOrderCode;
        }


        public Order MapOrderDtoToEntity(string OrderDtoJson, List<Order> orders)
        {
            JObject jsonObject = JObject.Parse(OrderDtoJson);
            string? assignedTo = null;
            DateTime? AssignedDate = null;


            int orderType = jsonObject.GetValue("OrderType").Value<int>();
             assignedTo = jsonObject.GetValue("AssignedTo").Value<string>();
            if (!string.IsNullOrEmpty(assignedTo))
            {
                AssignedDate = DateTime.UtcNow;
            }
            string OrderCode = GenerateOrderCode(orders, orderType);


 

            return new Order
            {

                OrderCode=OrderCode,
                OrderType=orderType,
                AssignedTo=assignedTo,
                AssignedDate=AssignedDate,
                CreationDate=DateTime.UtcNow,
                FinishedDate=null,
                Status=0,
            };
        }
    }
}

