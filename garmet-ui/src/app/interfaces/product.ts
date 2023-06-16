import {Category} from "./category";
import {Image} from "./image";
import {ProductVariety} from "./product-variety";

export interface Product {
  refId: string | undefined,
  name: string,
  totalQuantity?: number;
  worth?: number,
  noOfVarieties?: number,
  description?: string,
  varieties?: Array<ProductVariety>
  categories?: Array<Category>,
  images?: Array<Image>,
}
