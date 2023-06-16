import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { VarietyAddComponent } from './components/variety-add/variety-add.component';
import { AdminComponent } from './admin.component';
import { CategoryComponent } from './components/category/category.component';
import {MaterialModule} from "../material/material.module";
import { VarietyTableComponent } from './components/variety-table/variety-table.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DragDirective} from "./directives/drag.directive";
import {AdminRoutingModule} from "./admin-routing.module";
import {HttpClientModule} from "@angular/common/http";
import { CategoryAddComponent } from './components/category-add/category-add.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ProductAdminComponent } from './components/product-admin/product-admin.component';
import {HeaderComponent} from "../components/header/header.component";
import {ProductSearchComponent} from "../components/product-search/product-search.component";
import { UserComponent } from './components/user/user.component';
import { OrdersComponent } from './components/orders/orders.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { VarietyEditComponent } from './components/variety-edit/variety-edit.component';


@NgModule({
  declarations: [
    ProductAddComponent,
    ProductDetailComponent,
    VarietyAddComponent,
    AdminComponent,
    CategoryComponent,
    DragDirective,
    VarietyTableComponent,
    CategoryAddComponent,
    SidenavComponent,
    ProductAdminComponent,
    UserComponent,
    OrdersComponent,
    DashboardComponent,
    ProductEditComponent,
    VarietyEditComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    HeaderComponent,
    AdminRoutingModule,
    ProductSearchComponent
  ]
})
export class AdminModule { }
