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


        //public async Task<Product> MapBrandDtoToEntityAsync(string BrandDtoJson)
        //{
        //    JObject jsonObject = JObject.Parse(BrandDtoJson);

           



        //    return new Brand
        //    {
               
        //    };
        //}
    }
}

