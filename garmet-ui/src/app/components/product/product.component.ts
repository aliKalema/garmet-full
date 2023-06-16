import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Product} from "../../interfaces/product";
import {ProductService} from "../../services/product.service";
import {CartService} from "../../services/cart.service";
import {CartItem} from "../../interfaces/cart-item";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {PageState} from "../../interfaces/page-state";

const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, AfterViewInit {
  products!: Array<Product>
  cols = 3;
  rowHeight: number = ROWS_HEIGHT[this.cols];

  // @ViewChild(MatSort)
  // sort!: MatSort;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  pageSizeOptions: Array<number>=[1,5,10,20,50]
  pageState!: PageState;

  constructor(private productService: ProductService, private cartService : CartService) {
  }
  ngOnInit(): void {
    this.productService.getProducts().subscribe((res)=>{
      this.products = res;
    })
    this.productService.getPageState().subscribe((res: PageState)=>{
      this.pageState =  res;
    })
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe((pageEvent)=>{
      this.onPaginationEvent(pageEvent);
    })
  }

  onAddToCart(cartItem: CartItem): void {
    this.cartService.addToCart(cartItem);
  }
  onColumnsCountChange(colsNum: number): void {
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[colsNum];
  }

  onPaginationEvent(page: PageEvent): void{
    this.productService.setProductState(
      {
        pageIndex: page.pageIndex,
        pageSize: page.pageSize,
      })
  }
}
