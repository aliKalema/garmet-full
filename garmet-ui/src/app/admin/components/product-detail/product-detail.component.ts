import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, of, Subscription} from "rxjs";
import {Product} from "../../../interfaces/product";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ProductService} from "../../../services/product.service";
import {MatDialog} from "@angular/material/dialog";
import {ProductVariety} from "../../../interfaces/product-variety";
import {VarietyAddComponent} from "../variety-add/variety-add.component";
import {ProductDeleteConfirmComponent} from "../product-delete-confirm/product-delete-confirm.component";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy{
  private subscriptions: Array<Subscription> = [];
  private refId: string = '';
  product!: Product;

  constructor(private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private router: Router,
              private matDialog: MatDialog,) {}


  ngOnInit(): void {
    this.subscriptions.push(this.activatedRoute.params.subscribe((params: Params) => {
      this.refId = params['ref_id'];
      this.productService.getProductByRefId(this.refId).subscribe((res)=>{
        this.product = res;
      })
    }));
  }

  openVarietyDialog(): void{
    const dialogRef = this.matDialog.open(VarietyAddComponent,{
      width: "50%",
    })
  }

  editProduct(): void{
    this.router.navigate([`/admin/product/edit/${this.product.refId}`]).then()
  }

  deleteProduct(): void{
    const dialogRef = this.matDialog.open(ProductDeleteConfirmComponent,{
      width: "50%",
      data: this.product.refId,
    })
  }

  ngOnDestroy(): void {
  }

  getVarieties(): Observable<Array<ProductVariety>> {
    return of(this.product!.varieties!);
  }

  removeVariety(variety: ProductVariety ) {

  }
}
