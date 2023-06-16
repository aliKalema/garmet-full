import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Observable} from "rxjs";
import {ProductVariety} from "../../../interfaces/product-variety";
import {ChangeRoleComponent} from "../../../components/change-role/change-role.component";
import {VarietyEditComponent} from "../variety-edit/variety-edit.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-variety-table',
  templateUrl: './variety-table.component.html',
  styleUrls: ['./variety-table.component.css']
})
export class VarietyTableComponent {
  @Input()
  varieties!: Observable<ProductVariety[]>;
  displayedColumns: string[] = ['name', 'price', 'quantity', 'minQuantity', 'action'];

  @Output()
  removeVariety = new EventEmitter();

  constructor(private matDialog : MatDialog) {
  }

  edit(variety: ProductVariety): void {
    const dialogRef = this.matDialog.open(VarietyEditComponent,{
      data: variety,
      width: "35%",
    })
  }

  remove(variety: ProductVariety): void{
    this.removeVariety.emit(variety);
  }
}
