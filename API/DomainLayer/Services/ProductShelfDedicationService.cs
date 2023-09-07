using System;
using DomainLayer.Models;
using Newtonsoft.Json.Linq;

namespace DomainLayer.Services
{
	public class ProductShelfDedicationService : Service<ProductShelfDedication>
	{
		public ProductShelfDedicationService(IUnitOfWork unitOfWork) : base(unitOfWork)
		{
		}

		public async Task<ProductShelfDedication> CreateDedicationAsync(string newDedication) {

            JObject jsonObject = JObject.Parse(newDedication);
            
			var brand = await _uow.BrandRepository.FindByNameAsync(jsonObject.GetValue("BrandName").Value<string>());
			var shelf = await _uow.ShelfRepository.FindByShelfByNameAsync(jsonObject.GetValue("ShelfName").Value<string>());
			var productCategory = await _uow.ProductCategoryRepository.FindByNameAsync(jsonObject.GetValue("ProductCategoryName").Value<string>());
			if (brand==null || shelf==null)
			{
				return null;
			}

			return  new ProductShelfDedication
			{
				Sex = jsonObject.GetValue("Sex")?.Value<string>(),
				Face = jsonObject.GetValue("Face")?.Value<int?>() == 0 ? null : jsonObject.GetValue("Face")?.Value<int?>(),
                Row = jsonObject.GetValue("Row")?.Value<int?>() == 0 ? null : jsonObject.GetValue("Row")?.Value<int?>(),
                Column = jsonObject.GetValue("Column")?.Value<int?>() == 0 ? null : jsonObject.GetValue("Column")?.Value<int?>(),
                Shelf = shelf,
				ShelfFId = shelf.ShelfId,
				Brand = brand,
				BrandFId = brand.BrandId,
				ProductCategory = productCategory,
				ProductCategoryFId = productCategory?.ProductCategoryId


            };



        }


	public async Task<string> LookForRequestAsync(Product product)
		{
			if (product.BrandFId != null)
				product.Brand = await _uow.BrandRepository.FindByIdAsync((int)product.BrandFId);
			else
				return "product's brand is not specified";
			if (product.ProductCategoryFId != null)
				product.ProductCategory = await _uow.ProductCategoryRepository.FindByIdAsync((int)product.ProductCategoryFId);
			else
				return "product's category is not specified";


			string request = "There is a dedication for ";
			var result = await _uow.ProductShelfDedicationRepository.LookUpForDedication(product);
			if (result == null)
				return "there is no specified shelf for this product's brand, sex or category";


			if (result.BrandFId == product.BrandFId)
			{
                request += $"Brand: {result.Brand.BrandName} ,";
              
            }
            if (!string.IsNullOrEmpty(result.Sex) && result.Sex == product.Sex)
                request += $"Sex: {result.Sex} ,";

            if (result.ProductCategoryFId != null && result.ProductCategoryFId == product.ProductCategoryFId)
			{ 
              
                    request += $"Category: {result.ProductCategory.ProductsCategoryName}";
            }

			

			var shelfName = await _uow.ShelfRepository.FindByIdAsync(result.ShelfFId);
			request += $" at Shelf: {shelfName.ShelfName}";
			if (result.Face != null)
				request += $" Face: {result.Face}";
			if(result.Row !=null)
                request += $" Row: {result.Row}";
            if (result.Column != null)
                request += $" Column: {result.Column}";
			return request;
        }
	}
}

