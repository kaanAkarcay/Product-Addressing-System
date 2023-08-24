using API.Models.DTO;
namespace API.Data
{
	public static class DataStore
	{
		public static List<ProductDTO> products = new List<ProductDTO>
		{
			new ProductDTO{Barcode= 1111111111111, Sex="male",Product_Name="jacket",Product_Category="casual",Brand="prada",Product_Category_ID=1,Brand_ID=1 },
            new ProductDTO{Barcode= 1111112222222, Sex="male",Product_Name="jacket2",Product_Category="casual",Brand="prada",Product_Category_ID=1,Brand_ID=1 },
            new ProductDTO{Barcode= 1111113121212, Sex="male",Product_Name="jacket3",Product_Category="casual",Brand="prada",Product_Category_ID=1,Brand_ID=1 },
            new ProductDTO{Barcode= 9999999999999, Sex="male",Product_Name="jacket4",Product_Category="casual",Brand="prada",Product_Category_ID=1,Brand_ID=1 }
        };
	}
}

