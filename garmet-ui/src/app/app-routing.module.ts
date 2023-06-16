import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CheckoutComponent} from "./components/checkout/checkout.component";
import {LoginComponent} from "./components/login/login.component";
import {ProductComponent} from "./components/product/product.component";
import {SignupComponent} from "./components/signup/signup.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {AdminGuard} from "./guards/admin.guard";
import {WishlistComponent} from "./components/wishlist/wishlist.component";
import {AuthGuard} from "./guards/auth.guard";
import {CartComponent} from "./components/cart/cart.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "product",
    pathMatch: "full"
  },
  {
    path: "admin",
    canActivate:[AdminGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'product',
    component: ProductComponent
  },
  {
    path: 'wishlist',
    component: WishlistComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
