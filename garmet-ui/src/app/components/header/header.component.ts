import {Component, OnInit} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {CartService} from "../../services/cart.service";
import {CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {MatBadgeModule} from "@angular/material/badge";
import {CartItem} from "../../interfaces/cart-item";
import {RouterLink} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {User} from "../../interfaces/user";
import {MatDividerModule} from "@angular/material/divider";
import {MatDialog} from "@angular/material/dialog";
import {EditProfileComponent} from "../edit-profile/edit-profile.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    CurrencyPipe,
    NgIf,
    NgForOf,
    RouterLink,
    MatDividerModule
  ],
  standalone: true
})
export class HeaderComponent implements OnInit{
  cartQuantity: number =0;
  cartTotal: number = 0;
  cartList!: Array<CartItem>;
  profile!: User;
  isLoggedIn: boolean = false;
  isAdmin: boolean =  false;

  constructor(protected readonly cartService: CartService, private readonly authService: AuthService, private matDialog: MatDialog) {
  }
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();

    if(this.isLoggedIn){
      this.authService.loadProfile().subscribe((res)=>{
        this.profile = res;
        for(let role of this.profile!.roles!){
          if(role.name === 'ADMIN'){
            this.isAdmin = true;
          }
        }
      })
    }

    this.cartService.getTotal().subscribe((res)=>{
      this.cartTotal = res;
    });
    this.cartService.getQuantity().subscribe((res)=>{
      this.cartQuantity = res;
    })
    this.cartService.getCartList().subscribe((res)=>{
      this.cartList = res;
    })
  }

  onClearCart() {
    this.cartService.clearCart();
  }

  logout() {
    this.authService.logout()
  }

  editProfile() {
    const dialogRef = this.matDialog.open(EditProfileComponent,{
      width: "40%",
    })
  }
}
