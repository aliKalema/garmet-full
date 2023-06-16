import { Component } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {NavigationExtras, Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css'],
  imports: [
    FormsModule,
    MatIconModule
  ],
  standalone: true
})
export class ProductSearchComponent {

  searchTerm: string | undefined;
  constructor(private productService: ProductService, private router: Router) {
  }

  handleSearch(): void {
    if(this.searchTerm && this.searchTerm.length>0) {
      this.router.navigate([], {queryParams: {search_term: this.searchTerm}, queryParamsHandling: 'merge'}).then();
      this.productService.handleSearch(this.searchTerm);
    }
    else{
      const navigationExtras: NavigationExtras = {
        queryParams: {}
      };
      this.router.navigate([], navigationExtras).then();
      this.productService.reset();
    }
  }
}
