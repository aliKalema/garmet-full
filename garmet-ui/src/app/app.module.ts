import {ChangeDetectorRef, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductComponent } from './components/product/product.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FilterComponent } from './components/filter/filter.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "./material/material.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HeaderComponent} from "./components/header/header.component";
import { ProductHeaderComponent } from './components/product-header/product-header.component';
import { ProductBoxComponent } from './components/product-box/product-box.component';
import {NgOptimizedImage} from "@angular/common";
import { CartQuantityComponent } from './components/cart-quantity/cart-quantity.component';
import {LoadingInterceptor} from "./interceptors/loading.interceptor";
import {NotificationInterceptor} from "./interceptors/notification.interceptor";
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import { WishlistComponent } from './components/wishlist/wishlist.component';
import {ProductSearchComponent} from "./components/product-search/product-search.component";
import { CartComponent } from './components/cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductDetailComponent,
    CheckoutComponent,
    LoginComponent,
    SignupComponent,
    PageNotFoundComponent,
    FilterComponent,
    ProductHeaderComponent,
    ProductBoxComponent,
    CartQuantityComponent,
    WishlistComponent,
    CartComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        ProductSearchComponent,
        HeaderComponent,
        BrowserAnimationsModule,
        NgOptimizedImage
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NotificationInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
