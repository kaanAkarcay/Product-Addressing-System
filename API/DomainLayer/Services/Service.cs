using System;
using DomainLayer.SeedWork;
namespace DomainLayer.Services
{
	public abstract class Service<T> where T: Entity 
	{

		private protected IUnitOfWork _uow;
		protected Service(IUnitOfWork unitOfWork)
		{
			_uow = unitOfWork;
		}

		public virtual async Task<bool> CreateAsync(T t)
		{
			if (_uow.Repository.Create(t))
			{
				await _uow.SaveChangesAsync();
				return true;
			}
			else
				return false;
			
		}
		
		public virtual async Task<bool> DeleteAsync(T t)
		{
			if (_uow.Repository.Delete(t))
			{
				await _uow.SaveChangesAsync();
				return true;
			}
			else
				return false;
		}
		public virtual async Task<bool> UpdateAsync(T t)
		{
			if (_uow.Repository.Update(t))
			{
				await _uow.SaveChangesAsync();
				return true;
			}
			else
				return false;
			
		}
	}
}

