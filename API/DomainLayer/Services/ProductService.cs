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

        public async Task<Product> FindProductAsync(long barcode)
        {
            try
            {
                var product = await _uow.ProductRepository.FindByBarcodeAsync(barcode);
                return product; // This can be null if no product was found.
            }
            catch (Exception ex)
            {
                // Log the exception if needed
                // For now, we just return null to indicate a failure.
                return null;
            }
        }

        public string MapProductEntitiesToDtoJson(List<Product> products)
        {
            if (products == null || !products.Any())
                return null;

            var jsonArray = new JArray();

            foreach (var product in products)
            {
                var jsonObject = new JObject
                {
                    ["Barcode"] = product.Barcode,
                    ["ProductName"] = product.ProductName,
                    ["Sex"] = product.Sex,
                };

                if (product.Brand != null)
                {
                    jsonObject["Brand"] = product.Brand.BrandName ?? "";
                }
                else
                {
                    jsonObject["Brand"] = "";
                }

                if (product.ProductCategory != null)
                {
                    jsonObject["ProductCategory"] = product.ProductCategory.ProductsCategoryName ?? "";
                }
                else
                {
                    jsonObject["ProductCategory"] = "";
                }

                jsonArray.Add(jsonObject);
            }

            return jsonArray.ToString();
        }

        public string MapProductEntityToDtoJson(Product product)
        {
            if (product == null)
                return null;

            var jsonObject = new JObject
            {
                ["Barcode"] = product.Barcode,
                ["ProductName"] = product.ProductName,
                ["Sex"] = product.Sex,
            };

            if (product.Brand != null)
            {
                jsonObject["Brand"] = product.Brand.BrandName ?? "";
            }
            else
            {
                jsonObject["Brand"] = "";
            }

            if (product.ProductCategory != null)
            {
                jsonObject["ProductCategory"] = product.ProductCategory.ProductsCategoryName ?? "";
            }
            else
            {
                jsonObject["ProductCategory"] = "";
            }

            return jsonObject.ToString();
        }
        public async Task<Brand> GetBrandAsync(string name)
        {
            var brand = await _uow.BrandRepository.FindByNameAsync(name);
            if (brand == null)
                return null; // Handle error condition here

            return brand;
        }
        public async Task<ProductCategory> GetProductCategoryAsync(string name)
        {
            var productCategory = await _uow.ProductCategoryRepository.FindByNameAsync(name);
            if (productCategory == null)
                return null;
            return productCategory;
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

