using System;
using DomainLayer.Models;
using Newtonsoft.Json.Linq;
namespace DomainLayer.Services
{
	public class AdressService: Service<Adress>
	{
		public AdressService(IUnitOfWork unitOfWork): base(unitOfWork)
		{
		}
        //implement insertsion and removal Logic
    }
}

