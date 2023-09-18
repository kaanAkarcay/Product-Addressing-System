using System;
using DomainLayer.Models;
using DomainLayer.Models;

namespace DomainLayer.Services
{
	public class OrderItemService: Service<OrderItem>
	{
		public OrderItemService(IUnitOfWork unitOfWork) : base(unitOfWork)
		{
		}

		public async Task<List<OrderItem>> FindOrderItemByOrderId(int FId)
		{
			var allItems = await _uow.OrderItemRepository.FindAllAsync();
			var filteredItems = allItems.Where(item => item.OrderFId == FId).ToList();

			return filteredItems;
		}
		public async Task<List<OrderItem>> CreateOrderItemsAsync(List<long> barcodes, Order order)
		{
			List<OrderItem> orderItems = new List<OrderItem>();
			foreach (var item in barcodes)
			{
				var orderItem = new OrderItem
				{
					ProductBarcode = item,
					Status = 0,
					Order = order,
					OrderFId = order.OrderId
				};
				if (_uow.OrderItemRepository.Create(orderItem))
					orderItems.Add(orderItem);
				else
					return null;
			}
			await _uow.SaveChangesAsync();
			return orderItems;
		}
    }
}

