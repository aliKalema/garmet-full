import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Product} from "../interfaces/product";
import {BehaviorSubject, Observable} from "rxjs";
import {environment as env} from "../../environments/environment.development";
import {Cart, CartItem} from "../interfaces/cart-item";
import {MatSnackBar} from "@angular/material/snack-bar";

export interface Wishlist {
  content: Array<string>
}
@Injectable({
  providedIn: 'root'
})

export class WishlistService {
  private wishlist: BehaviorSubject<Array<string>> =  new BehaviorSubject<Array<string>>([]);
  constructor(private snackBar: MatSnackBar) {
    this.wishlist.next(this.loadFromLocalStorage());
  }

  addToWishList( refId: string): void{
    const ids =  this.wishlist.value;
    let exist =  false;
    if(ids.length>0){
      for(let id of ids){
        if(id=== refId){
          exist =  true
        }
      }
      if(!exist){
        ids.push(refId);
      }
    }
    else{
      ids.push(refId);
    }
    this.updateLocalStorage(ids);
    this.wishlist.next(ids);
    this.snackBar.open(` 1 item added to wishlist.`, 'Ok', { duration: 3000 });
  }

  removeFromWishList(refId: string): void{
    const ids =  this.wishlist.value;
    let exist =  false;
    if(ids.length>0){
      for(let i=0; i<ids.length; i++){
        if(ids[i]=== refId){
          ids.splice(i, 1);
        }
      }
      this.updateLocalStorage(ids);
      this.wishlist.next(ids);
      this.snackBar.open(`1 item removed From Wishlist`, 'Ok', { duration: 3000 });
    }
    else{
      this.snackBar.open(`Wishlist is Empty`, 'Ok', { duration: 3000 });
    }
  }

  loadFromLocalStorage(): Array<string>{
    const item = localStorage.getItem('wishlist');
    if (item) {
      const cart = JSON.parse(item);
      return cart.content;
    }
    else {
      const cart:Wishlist = {content:[]}
      localStorage.setItem('wishlist',JSON.stringify(cart));
      return [];
    }
  }

  private updateLocalStorage(refIds: string[]):void{
    localStorage.setItem('wishlist',JSON.stringify({content:refIds}));
  }

  public getWishlist(): Observable<Array<string>>{
    return this.wishlist.asObservable();
  }

}
