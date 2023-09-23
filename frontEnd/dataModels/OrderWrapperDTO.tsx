interface OrderWrapperDTO {
    Id?:string;
    OrderType: string;
    AssignedTo: string;
    OrderCode:string;
    ProductBarcodes: string[];
  }
  
  export default OrderWrapperDTO;
  
