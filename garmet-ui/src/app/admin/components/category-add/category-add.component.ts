import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Category} from "../../../interfaces/category";
import {FormBuilder, FormControl, NgForm} from "@angular/forms";
import {FloatLabelType} from "@angular/material/form-field";
import {CategoryService} from "../../../services/category.service";
import {MatDialogRef} from "@angular/material/dialog";
import {MatPaginator} from "@angular/material/paginator";
import {BehaviorSubject, debounceTime, distinctUntilChanged, from, map, Observable, switchMap} from "rxjs";
import {Page} from "../../../interfaces/page";

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit{
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  options = this._formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });
  category: Category = {
    refId: "",
    name: "",
    parentRefId: "",
  }
  parents: Array<Category>= [];

  searchInput = new FormControl();

  pageSize = 10;

  optionSelected = new EventEmitter<Category>();

  private categories: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([])

  parentRefId: string = "";
  dataSize!: Observable<number>;



  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor( private _formBuilder: FormBuilder,
               public categoryService: CategoryService,
               private dialogRef: MatDialogRef<CategoryAddComponent>) {}

  ngOnInit(): void {

    this.categoryService.getAllCategories().subscribe((res)=>{
      this.categories.next(res);
    });
    this.searchInput.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((value) => {
          if (value) {
            return this.categoryService.searchCategory({ searchTerm: value, pageSize: this.pageSize, pageNumber: 0, categoryHierarchy: 'NONE' });
          } else {
            return this.categoryService.getAllCategories()
          }
        })
      )
      .subscribe((catPage: Page<Category> | Category[]) => {
        if (Array.isArray(catPage)) {
          this.categories.next(catPage);
        } else {
          this.categories.next(catPage.content);
        }
      })
  }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

  onSaveForm(productForm: NgForm) {
    this.categoryService.createCategory(this.category).subscribe();
    this.dialogRef.close();
  }

  clearForm(productForm: NgForm) {
    productForm.reset();
    this.dialogRef.close();
  }
  getCategories(): Observable<Category[]>{
    return this.categories.asObservable();
  }

  selectParent(cat: Category) {
    this.category.parentRefId = cat.refId;
  }
}
