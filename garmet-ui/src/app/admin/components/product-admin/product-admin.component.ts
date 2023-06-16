import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ProductService} from "../../../services/product.service";
import {Product} from "../../../interfaces/product";
import {Observable, of} from "rxjs";
import {SelectionModel} from "@angular/cdk/collections";
import {Router} from "@angular/router";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {ProductDeleteConfirmComponent} from "../product-delete-confirm/product-delete-confirm.component";
import {PageState} from "../../../interfaces/page-state";

@Component({
  selector: 'app-product-admin',
  templateUrl: './product-admin.component.html',
  styleUrls: ['./product-admin.component.css']
})
export class ProductAdminComponent implements OnInit, AfterViewInit{
  products!: Array<Product>;
  pageState!: PageState;

  displayedColumns: string[] = ['select', 'name', 'totalQuantity', 'worth', 'noOfVarieties', 'status', 'action'];

  selection = new SelectionModel<Product>(true, []);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  pageSizeOptions: Array<number>=[1,5,10,20,50]

  constructor(private productService: ProductService,private matDialog: MatDialog, private router: Router) {
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

  getProductObservable(): Observable<Array<Product>>{
    return of(this.products);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    return numSelected === this.products.length;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.products);
  }

  openProductDetailsPage(refId: string): void{
    this.router.navigate([`/admin/product/${refId}`]).then();
  }

  onPaginationEvent(page: PageEvent): void{
    this.productService.setProductState(
      {
        pageIndex: page.pageIndex,
        pageSize: page.pageSize,
      })
  }

  openProductEdit(refId: string) {
    this.router.navigate([`admin/product/edit/${refId}`]).then();
  }

  deleteProduct(refId: string): void{
    const dialogRef = this.matDialog.open(ProductDeleteConfirmComponent,{
      width: "50%",
      data: refId,
    })
  }
}
