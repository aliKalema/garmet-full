
import {ProductVariety} from "./product-variety";

export interface OrderItem {
  id: number;
  productVariety: ProductVariety;
  productName: string,
  quantity: number;
  price: number;
}
