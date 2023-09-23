using System;
using DomainLayer.Models;
using Newtonsoft.Json.Linq;

namespace DomainLayer.Services
{
	public class BrandService: Service<Brand>
	{
		public BrandService(IUnitOfWork unitOfWork): base(unitOfWork)
		{
		}
        public async Task<Brand> FindBrandByIdAsync(int id)
        {
            return await _uow.BrandRepository.FindByIdAsync(id);
        }
        public async Task<Brand> FindBrandByNameAsync(string name)
        {
            return await _uow.BrandRepository.FindByNameAsync(name);
        }

        public async Task<List<Brand>> FindBrandsAsync()
        {
            return await _uow.BrandRepository.FindAllAsync();
        }

        public string MapBrandEntityToDtoJson(Brand brand)
        {
            if (brand == null)
                return null;

            JObject jsonObject = new JObject
            {
              
                ["BrandName"] = brand.BrandName
            };

            return jsonObject.ToString();
        }

        public List<string> MapBrandEntitiesToDtoJsons(List<Brand> brands)
        {
            if (brands == null || !brands.Any())
                return null;

            List<string> brandDtoJsons = new List<string>();

            foreach (var brand in brands)
            {
                var jsonObject = new JObject
                {
  
                    ["BrandName"] = brand.BrandName
                };
                brandDtoJsons.Add(jsonObject.ToString());
            }

            return brandDtoJsons;
        }


        public Brand MapBrandDtoToEntity(string brandDtoJson)
		{
            JObject jsonObject = JObject.Parse(brandDtoJson);
            Brand? brand = null;


            string brandName = jsonObject.GetValue("BrandName").Value<string>();

			if ( string.IsNullOrEmpty(brandName))
				return null;

			return new Brand
			{
	
				BrandName = brandName
			};
        }
    }
}

