import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {CartItem} from "../../../interfaces/cart-item";
import {ProductService} from "../../../services/product.service";

@Component({
  selector: 'app-product-delete-confirm',
  templateUrl: './product-delete-confirm.component.html',
  styleUrls: ['./product-delete-confirm.component.css'],
  imports: [
    MatDialogModule
  ],
  standalone: true
})
export class ProductDeleteConfirmComponent {
constructor(@Inject(MAT_DIALOG_DATA) public refId: string,private productService: ProductService, private dialogRef: MatDialogRef<ProductDeleteConfirmComponent>) {
}

confirmDelete(): void{
  this.productService.deleteProduct(this.refId);
}

  onDelete() {
    this.productService.deleteProduct(this.refId);
  }
}
