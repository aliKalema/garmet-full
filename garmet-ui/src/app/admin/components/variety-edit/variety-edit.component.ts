import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CartItem} from "../../../interfaces/cart-item";
import {ProductVariety} from "../../../interfaces/product-variety";
import {VarietyService} from "../../services/variety.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-variety-edit',
  templateUrl: './variety-edit.component.html',
  styleUrls: ['./variety-edit.component.css']
})
export class VarietyEditComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public variety: ProductVariety, private varietyService: VarietyService, private dialogRef: MatDialogRef<VarietyEditComponent>) {
  }

  clearForm(varietyForm: NgForm) {
    varietyForm.reset();
  }

  onSaveForm(varietyForm: NgForm) {
    this.varietyService.updateVariety(this.variety,false);
    this.dialogRef.close();
  }
}
