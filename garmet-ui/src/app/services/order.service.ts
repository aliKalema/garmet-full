import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment as env} from "../../environments/environment";
import {Order} from "../interfaces/order";
import {CartService} from "./cart.service";
import {CartItem} from "../interfaces/cart-item";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  cartItems!: Array<CartItem>;
  constructor(private httpClient: HttpClient, private cartService: CartService, private snackBar: MatSnackBar, private router: Router) {
    this.cartService.getCartList().subscribe((res)=>{
      this.cartItems = res;
    })
  }

  getOrders():Observable<Array<Order>> {
    return this.httpClient.get<Array<Order>>(`${env.backend.url}/api/v1/orders`);
  }

  postOrder(): Observable<Order>{
    return this.httpClient.post<Order>(`${env.backend.url}/api/v1/orders`,{cartItems: this.cartItems}).pipe(map((res)=>{
      if(res){
        this.snackBar.open(`Order Places Successfully`, 'Ok', {
          duration: 3000,
        });
        this.cartService.clearCart();
        this.router.navigate(['/product']).then();
      }
      return res;
    }))
  }
}
