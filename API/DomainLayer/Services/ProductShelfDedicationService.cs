using System;
using System.Globalization;
using System.Text.Json;
using System.Text.Json.Serialization;
using DomainLayer.Models;
using Newtonsoft.Json.Linq;

namespace DomainLayer.Services
{
	public class ProductShelfDedicationService : Service<ProductShelfDedication>
	{
		public ProductShelfDedicationService(IUnitOfWork unitOfWork) : base(unitOfWork)
		{
		}

		public async Task<ProductShelfDedication> FindProductShelfDedicationById(int id)
		{
			return await _uow.ProductShelfDedicationRepository.FindByIdAsync(id);
		}

        public async Task<List<ProductShelfDedication>> FindAllProductShelfDedications()
        {
			return await _uow.ProductShelfDedicationRepository.FindAllAsync();
        }


		public async Task<string> ProductShelfDedicationEntityToDTO(ProductShelfDedication productShelfDedication)
		{
            if (productShelfDedication == null)
                return null;
			var shelf = await _uow.ShelfRepository.FindByIdAsync(productShelfDedication.ShelfFId);
			var brand = await _uow.BrandRepository.FindByIdAsync(productShelfDedication.BrandFId);
			ProductCategory? productCategory=null;

            int? pdChecker;
			pdChecker = productShelfDedication.ProductCategoryFId;
			if(pdChecker!=null)
			 productCategory = await _uow.ProductCategoryRepository.FindByIdAsync((int)pdChecker);

			var pdName = productCategory?.ProductsCategoryName ?? string.Empty;

            JObject jsonObject = new JObject
            {
			            
				["Sex"] = productShelfDedication.Sex ?? string.Empty,
                ["Face"] = (productShelfDedication.Face != null) ? productShelfDedication.Face?.ToString(CultureInfo.InvariantCulture) : string.Empty,
                ["Row"] = (productShelfDedication.Row != null) ? productShelfDedication.Row?.ToString(CultureInfo.InvariantCulture) : string.Empty,
                ["Column"] = (productShelfDedication.Column != null) ? productShelfDedication.Column?.ToString(CultureInfo.InvariantCulture) : string.Empty,


                ["ShelfName"] = shelf.ShelfName,

				["BrandName"] = brand.BrandName,

				["ProductCategoryName"] = pdName ?? string.Empty
            };

			return jsonObject.ToString();
        }



        public async Task<List<string>> ProductShelfDedicationsToDTOList(List<ProductShelfDedication> productShelfDedications)
        {
            if (productShelfDedications == null || productShelfDedications.Count == 0)
                return null;

            var jsonArray = new List<string>();

            foreach (var productShelfDedication in productShelfDedications)
            {
                var shelf = await _uow.ShelfRepository.FindByIdAsync(productShelfDedication.ShelfFId);
                var brand = await _uow.BrandRepository.FindByIdAsync(productShelfDedication.BrandFId);
                ProductCategory? productCategory = null;

                int? pdChecker;
                pdChecker = productShelfDedication.ProductCategoryFId;
                if (pdChecker != null)
                    productCategory = await _uow.ProductCategoryRepository.FindByIdAsync((int)pdChecker);

                var pdName = productCategory?.ProductsCategoryName ?? string.Empty;

                var jsonObject = new
                {
                    Sex = productShelfDedication.Sex ?? string.Empty,
                    Face = (productShelfDedication.Face != null || productShelfDedication.Face == 0) ? productShelfDedication.Face?.ToString(CultureInfo.InvariantCulture) : string.Empty,
                    Row = (productShelfDedication.Row != null || productShelfDedication.Row == 0) ? productShelfDedication.Row?.ToString(CultureInfo.InvariantCulture) : string.Empty,
                    Column = (productShelfDedication.Column != null || productShelfDedication.Column == 0) ? productShelfDedication.Column?.ToString(CultureInfo.InvariantCulture) : string.Empty,
                    ShelfName = shelf.ShelfName,
                    BrandName = brand.BrandName,
                    ProductCategoryName = pdName
                };

               
                jsonArray.Add(jsonObject.ToString());
            }

			return jsonArray;
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

