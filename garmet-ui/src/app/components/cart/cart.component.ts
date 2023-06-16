import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartItem} from "../../interfaces/cart-item";
import {Observable, Subscription} from "rxjs";
import {CartService} from "../../services/cart.service";
import {OrderService} from "../../services/order.service";
import {AuthService} from "../../services/auth.service";
import {Role} from "../../interfaces/user";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy{
  displayedColumns: string[] = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action',
  ];
  dataSource!:Observable<CartItem[]>;
  total!:Observable<number>;
  profileSub: Subscription | undefined;
  constructor(private cartService: CartService,private authService: AuthService, private snackBar: MatSnackBar, private orderService: OrderService) { }

  ngOnInit(): void {
    this.dataSource= this.cartService.getCartList();
    this.total=this.cartService.getTotal();
  }

  onRemoveFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item);
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }

  onUpdateQuantity(item:CartItem,num:number):void{
    item.quantity= item.quantity+(num);
    this.cartService.updateCart(item);
  }
  onCheckout(): void {
    if(this.authService.isLoggedIn()){
      this.authService.loadProfile().subscribe((res)=>{
        let userRole: boolean = false;
        for(let role of res!.roles!){
          if(role.name === 'USER'){
            userRole = true;
          }
        }
        if(!userRole){
          this.snackBar.open(`Login to a USER ACCOUNT`, 'Ok', {
            duration: 3000,
          });

        }
        else{
          this.orderService.postOrder().subscribe();
        }
      })
    }
  }
  OnOrder(){
    this.orderService.postOrder().subscribe();
  }

  ngOnDestroy(): void {
    if (this.profileSub) {
      this.profileSub.unsubscribe();
    }
  }

}
