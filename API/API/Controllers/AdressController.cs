using System;
using DomainLayer.Services;
using API.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DomainLayer.Models;
using Newtonsoft.Json;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdressController: ControllerBase
	{
		private readonly AdressService _adressService;
		public AdressController(AdressService adressService)
		{
			_adressService = adressService;
		}

		//implement insertsion and removal calls
	}
}

