using System;
namespace DomainLayer.SeedWork
{
	public interface  IRepository<T> where T: Entity
	{
		bool Create(T e);

		bool Update(T e);

		bool Delete(T e);


		Task<List<T>> FindAllAsync();
		Task<T> FindByIdAsync(int Id);
	}
}

