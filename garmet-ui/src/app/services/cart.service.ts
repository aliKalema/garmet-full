import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Cart, CartItem} from "../interfaces/cart-item";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _cartList = new BehaviorSubject<Array<CartItem>>( [] );
  private _total: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private _quantity: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  constructor(private snackBar: MatSnackBar) {
    this._cartList.next(this.loadFromLocalStorage());
    this.updateTotalAndQuantity();
  }

  private updateLocalStorage(cartItems: CartItem[]):void{
    localStorage.setItem('cart',JSON.stringify({content:cartItems}));
  }

  private updateTotalAndQuantity():void{
    const list:Array<CartItem>= this._cartList.value;
    let total = 0;
    let quantity = 0;
    for(let item of list){
      total = total + item.quantity * item.price;
      quantity= quantity + item.quantity;
    }
    this._quantity.next(quantity);
    this._total.next(total);
  }

  addToCart(item: CartItem): void {
    const list= this._cartList.value;
    let exist =  false;
    let existItem:CartItem;
    for(let ele of list){
      if(ele.refId === item.refId ){
        exist= true;
        existItem=ele;
        break;
      }
    }
    if (exist) {
      item.quantity = item.quantity + existItem!.quantity;
    }
    else {
      list.push(item);
    }
    this._cartList.next(list);
    this.updateLocalStorage(list);
    this.snackBar.open(`${item.quantity}  item added to cart.`, 'Ok', { duration: 3000 });
    this.updateTotalAndQuantity();
  }

  removeFromCart(item: CartItem): void {
    const list: Array<CartItem> =  this._cartList.value;
    for(let i=0;i<list.length;i++){
      if(item.refId === list[i].refId){
        list.splice(i,1);
        break;
      }
    }
    this.updateLocalStorage(list);
    this._cartList.next(list);
    this.snackBar.open(`Item with name ${item.productName}(${item.varietyName}) removed from cart.`, 'Ok', {
      duration: 3000,
    });
    this.updateTotalAndQuantity();
  }

  updateCart(item: CartItem):void{
    const list: Array<CartItem> =  this._cartList.value;
    for(let i=0;i<list.length;i++){
      if(item.refId === list[i].refId){
        list[i]=item;
        break;
      }
    }
    this.updateLocalStorage(list);
    this._cartList.next(list);
    this.snackBar.open(`Item with name ${item.productName}(${item.varietyName}) updated.`, 'Ok', {
      duration: 3000,
    });
    this.updateTotalAndQuantity();
  }

  clearCart(): void {
    localStorage.setItem('cart', JSON.stringify({content:[]}));
    this._cartList.next([] );
    this.snackBar.open('Cart is cleared.', 'Ok', {
      duration: 3000,
    });
    this.updateTotalAndQuantity();
  }


  private loadFromLocalStorage(): Array<CartItem>{
    const item = localStorage.getItem('cart');
    if (item) {
      const cart = JSON.parse(item);
      return cart.content;
    }
    else {
      const cart:Cart = {content:[]}
      localStorage.setItem('cart',JSON.stringify(cart));
      return [];
    }
  }

  getTotal():Observable<number>{
    return this._total.asObservable();
  }

  getQuantity(): Observable<number>{
    return this._quantity.asObservable();
  }

  getCartList():Observable<CartItem[]>{
    return this._cartList.asObservable();
  }

}
