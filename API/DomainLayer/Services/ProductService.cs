using System;
using DomainLayer.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
namespace DomainLayer.Services
{
	public class ProductService: Service<Product>
	{
		public ProductService(IUnitOfWork unitOfWork): base(unitOfWork)
		{
		}

        public async Task<List<Product>> FindProductsAsync()
        {
            return await _uow.ProductRepository.FindAllAsync();
        }

        public async Task<Product> MapProductDtoToEntityAsync(string productDtoJson)
        {
            Console.WriteLine("triggered");
            JObject jsonObject = JObject.Parse(productDtoJson);
            Console.WriteLine("parsed bro: "+ jsonObject);
            Brand brand=null;
            ProductCategory productCategory=null;
            int? productCategoryID = null ,brandID = null;
            long barcode = jsonObject.GetValue("Barcode").Value<long>();
            string productName = jsonObject.GetValue("ProductName").Value<string>();
            string sex = jsonObject.GetValue("Sex").Value<string>();
            string brandName = jsonObject.GetValue("Brand").Value<string>();
            string productCategoryName = jsonObject.GetValue("ProductCategory").Value<string>();
            if (!string.IsNullOrEmpty(brandName))
            {
                 brand = await _uow.BrandRepository.FindByNameAsync(brandName);
                if (brand == null)
                    return null; // Handle error condition here
                brandID = brand.BrandId;
            }

            if (!string.IsNullOrEmpty(productCategoryName))
            {
                 productCategory = await _uow.ProductCategoryRepository.FindByNameAsync(productCategoryName);
                if (productCategory == null)
                    return null;
                productCategoryID = productCategory.ProductCategoryId;
            }
          

          

            return new Product
            {
                Barcode = barcode,
                ProductName = productName,
                Sex = sex,
                BrandFId = brandID,
                ProductCategoryFId = productCategoryID,
                Brand = brand,
                ProductCategory = productCategory
            };
        }


    }
}

