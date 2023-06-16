import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Product} from "../../interfaces/product";
import {environment} from "../../../environments/environment.development";
import {CartItem} from "../../interfaces/cart-item";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-cart-quantity',
  templateUrl: './cart-quantity.component.html',
  styleUrls: ['./cart-quantity.component.css']
})
export class CartQuantityComponent implements OnInit {
  quantity: number =1
  protected readonly environment = environment;
  constructor(@Inject(MAT_DIALOG_DATA) public cartItem: CartItem, private cartService: CartService, private dialogRef: MatDialogRef<CartQuantityComponent>) {
  }
  ngOnInit() {
  }

  remove(): void {
    if(this.quantity > 1){
      this.quantity = this.quantity -1;
    }
  }

  add():void{
    this.quantity = this.quantity +1;
  }

  submit() {
    this.cartItem.quantity = this.quantity;
    this.cartService.addToCart(this.cartItem);
    this.dialogRef.close();
  }

  cancel(){
    this.dialogRef.close();
  }
}
