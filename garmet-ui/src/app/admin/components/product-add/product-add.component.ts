import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, NgForm} from "@angular/forms";
import {CategoryService} from "../../../services/category.service";
import {FloatLabelType} from "@angular/material/form-field";
import {DomSanitizer} from "@angular/platform-browser";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {ProductService} from "../../../services/product.service";
import {MatDialog} from "@angular/material/dialog";
import {VarietyAddComponent} from "../variety-add/variety-add.component";
import {ProductVariety} from "../../../interfaces/product-variety";
import {Observable, Subscription} from "rxjs";
import {VarietyService} from "../../services/variety.service";
import {Category} from "../../../interfaces/category";
import {Product} from "../../../interfaces/product";
import {FileHandle} from "../../../interfaces/file-handle";

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements  OnInit{

  categories: Array<Category>= [];
  product: Product = {
    totalQuantity: 0,
    categories: [],
    description: "",
    images: [],
    varieties:[],
    name: "",
    refId: ""
  }

  @ViewChild('categorySelect')
  categorySelect!: MatSelect

  images: Array<FileHandle> = [];
  varieties!: Observable<ProductVariety[]>;
  subscriptions: Array<Subscription>= [];
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  options = this._formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });
  constructor(private categoryService: CategoryService,
              private productService: ProductService,
              private sanitizer: DomSanitizer,
              private _formBuilder: FormBuilder,
              private matDialog: MatDialog,
              private varietyService: VarietyService) {
  }

  ngOnInit(): void {
    this.categoryService.getLastNodeCategories().subscribe((res)=>{
      this.categories = res;
    });
    this.varietyService.refresh();
    this.varieties = this.varietyService.getVarieties();
  }

  onSaveForm(productForm: NgForm) {
    this.varieties.subscribe((res)=>{this.product.varieties = res});
    this.productService.addProduct(this.prepareFormData()).subscribe((res)=>{})
    this.varietyService.refresh();
  }

  prepareFormData(): FormData{
    const formData = new FormData();
    formData.append("product", new Blob([JSON.stringify(this.product)], {type: 'application/json'}));
    this.images.forEach((image)=>{
      if(image){
        formData.append('images',image!.file, image!.file.name);
      }
    });
    return formData;
  }

  clearForm(productForm: NgForm):void{
    productForm.reset();
    this.images = [];
    this.varietyService.refresh();
  }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

  onFileSelected(event:any){
    if(event.target.files && event.target.files){
      const selectedFile = event.target.files[0];
      this.images.push( {
        file: selectedFile,
        url: this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(selectedFile))
      });
    }
  }

  removeImage(index: number) {
    this.images.splice(index, 1);
  }

  onFilesDropped(fileHandle: FileHandle){
    this.images.push(fileHandle);
  }

  openAddVarietyDialog() {
    const dialogRef = this.matDialog.open(VarietyAddComponent,{
      width: "50%",
    })

  }

  clearCategory() {
    this.categorySelect.options.forEach((data: MatOption) => data.deselect());
  }

  removeVariety(variety: ProductVariety) {
    this.varietyService.remove(variety.code!);
  }
}
