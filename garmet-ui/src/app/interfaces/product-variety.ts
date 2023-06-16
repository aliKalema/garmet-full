import {Product} from "./product";

export interface ProductVariety {
  refId:string,
  name: string,
  code?: number,
  price: number,
  quantity: number,
  minQuantity?: number;
  product?: Product;
}
