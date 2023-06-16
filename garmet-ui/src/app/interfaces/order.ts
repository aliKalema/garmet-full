import {OrderItem} from "./order-item";
import {User} from "./user";

export declare type OrderStatus =  'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

export interface Order {
  id: number;
  user: User;
  timestamp: string;
  orderItems: OrderItem[];
  orderStatus: OrderStatus;
  total: number;
}
