import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductVariety} from "../../../interfaces/product-variety";
import {FormBuilder, FormControl, NgForm} from "@angular/forms";
import {VarietyService} from "../../services/variety.service";
import {FloatLabelType} from "@angular/material/form-field";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-variety-add',
  templateUrl: './variety-add.component.html',
  styleUrls: ['./variety-add.component.css']
})
export class VarietyAddComponent implements OnInit{
    constructor(private varietyService: VarietyService, private dialogRef: MatDialogRef<VarietyAddComponent>) {}
    ngOnInit(): void {
    }

   variety: ProductVariety ={
      refId:"",
     code: 0,
     quantity: 0,
     minQuantity: 0,
     price: 0,
     name: "",
  }

  clearForm(varietyForm: NgForm) {
    varietyForm.reset();
  }

  onSaveForm(varietyForm: NgForm) {
    this.varietyService.add(this.variety);
    this.dialogRef.close();
  }

}
