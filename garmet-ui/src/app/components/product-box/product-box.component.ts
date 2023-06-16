import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {WishlistService} from "../../services/wishlist.service";
import {Product} from "../../interfaces/product";
import {environment} from "../../../environments/environment.development";
import {ProductVariety} from "../../interfaces/product-variety";
import {MatDialog} from "@angular/material/dialog";
import {VarietyAddComponent} from "../../admin/components/variety-add/variety-add.component";
import {CartQuantityComponent} from "../cart-quantity/cart-quantity.component";

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.css']
})
export class ProductBoxComponent implements OnInit, AfterViewInit {

  @Input()
  fullWidthMode = false;

  @Input()
  product!: Product;

  @Output()
  addToCart = new EventEmitter();

  quantity:number =1;

  stockStatus: string = "Out of Stock";

  currentVariety!: ProductVariety;
  constructor(private router: Router, private wishlistService: WishlistService, private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.currentVariety = this.product.varieties![0];
  }

  ngAfterViewInit() {
    if(this.product!.totalQuantity!>0){
      this.stockStatus = "IN STOCK";
    }
  }

  onAddToCart(): void {

    this.addToCart.emit(this.product);
  }

  navigate():void{
    this.router.navigate([`product/${this.product!.refId}`, ]).then();
  }

  protected readonly environment = environment;

  selectVariety(variety: ProductVariety) {
    this.currentVariety = variety
  }

  openQuantityDialog(){
    const cartItem = {
      refId: this.currentVariety.refId,
      image:this.product?.images?.[0].url || '',
      productName: this.product.name,
      varietyName: this.currentVariety.name,
      price: this.currentVariety.price,
      quantity: this.quantity
    }
    const dialogRef = this.matDialog.open(CartQuantityComponent,{
      data: cartItem,
      width: "40%",
    })

  }
}
