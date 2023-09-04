using System;
using DomainLayer.Models;
using Newtonsoft.Json.Linq;

namespace DomainLayer.Services
{
	public class ProductCategoryService : Service<ProductCategory>
	{
		public ProductCategoryService(IUnitOfWork unitOfWork): base(unitOfWork)
		{
		}


        public async Task<ProductCategory> FindProductCategoryByIdAsync(int id)
        {
            return await _uow.ProductCategoryRepository.FindByIdAsync(id);
        }

        public async Task<List<ProductCategory>> FindProductCategoriesAsync()
        {
            return await _uow.ProductCategoryRepository.FindAllAsync();
        }


        // Map single ProductCategory entity to DTO in JSON format
        public string MapProductCategoryEntityToDtoJson(ProductCategory productCategory)
        {
            if (productCategory == null)
                return null;

            JObject jsonObject = new JObject
            {
                ["ProductCategoryId"] = productCategory.ProductCategoryId,
                ["ProductsCategoryName"] = productCategory.ProductsCategoryName
            };

            return jsonObject.ToString();
        }

        // Map list of ProductCategory entities to a list of DTOs in JSON format
        public List<string> MapProductCategoryEntitiesToDtoJsons(List<ProductCategory> productCategories)
        {
            if (productCategories == null || !productCategories.Any())
                return null;

            List<string> productCategoryDtoJsons = new List<string>();

            foreach (var productCategory in productCategories)
            {
                var jsonObject = new JObject
                {
                    ["ProductCategoryId"] = productCategory.ProductCategoryId,
                    ["ProductsCategoryName"] = productCategory.ProductsCategoryName
                };
                productCategoryDtoJsons.Add(jsonObject.ToString());
            }

            return productCategoryDtoJsons;
        }

        // Map a ProductCategory DTO in JSON format to a ProductCategory entity
        public ProductCategory MapProductCategoryDtoToEntity(string productCategoryDtoJson)
        {
            JObject jsonObject = JObject.Parse(productCategoryDtoJson);

            int productCategoryId = jsonObject.GetValue("ProductCategoryId").Value<int>();
            string productsCategoryName = jsonObject.GetValue("ProductsCategoryName").Value<string>();

            if (productCategoryId <= 0 || string.IsNullOrEmpty(productsCategoryName))
                return null;

            return new ProductCategory
            {
                ProductCategoryId = productCategoryId,
                ProductsCategoryName = productsCategoryName
            };
        }




    }
}

