import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminComponent} from "./admin.component";
import {ProductAdminComponent} from "./components/product-admin/product-admin.component";
import {ProductDetailComponent} from "./components/product-detail/product-detail.component";
import {CategoryComponent} from "./components/category/category.component";
import {ProductAddComponent} from "./components/product-add/product-add.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {ProductEditComponent} from "./components/product-edit/product-edit.component";
import {OrdersComponent} from "./components/orders/orders.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: "full"
  },
  {
    path: '',
    component: AdminComponent,
    children:[
      {
        path: 'product',
        component: ProductAdminComponent
      },
      {
        path: 'product/add',
        component: ProductAddComponent
      },
      {
        path: "product/:ref_id",
        component: ProductDetailComponent
      },
      {
        path: "product/edit/:ref_id",
        component: ProductEditComponent
      },
      {
        path: 'category',
        component: CategoryComponent
      },
      {
        path: 'order',
        component: OrdersComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
