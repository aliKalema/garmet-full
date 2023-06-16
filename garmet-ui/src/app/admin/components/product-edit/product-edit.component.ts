import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Category} from "../../../interfaces/category";
import {Product} from "../../../interfaces/product";
import {MatSelect} from "@angular/material/select";
import {FileHandle} from "../../../interfaces/file-handle";
import {BehaviorSubject, Observable, of, Subscription} from "rxjs";
import {ProductVariety} from "../../../interfaces/product-variety";
import {FormBuilder, FormControl, NgForm} from "@angular/forms";
import {FloatLabelType} from "@angular/material/form-field";
import {CategoryService} from "../../../services/category.service";
import {ProductService} from "../../../services/product.service";
import {DomSanitizer} from "@angular/platform-browser";
import {MatDialog} from "@angular/material/dialog";
import {VarietyService} from "../../services/variety.service";
import {VarietyAddComponent} from "../variety-add/variety-add.component";
import {MatOption} from "@angular/material/core";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ImageService} from "../../../services/image.service";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})

export class ProductEditComponent implements  OnInit, OnDestroy, AfterViewInit{

  categories: Array<Category>= [];
  product: Product ={name: "", refId: undefined}

  @ViewChild('categorySelect')
  categorySelect!: MatSelect

  images: Array<FileHandle> = [];
  varieties!: Observable<ProductVariety[]>;
  subscriptions: Array<Subscription>= [];
  hideRequiredControl= new FormControl(false);
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  options = this._formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });


  private routeSub: Subscription | undefined;
  private imageSub: Subscription | undefined;
  private productSub: Subscription | undefined;
  private categorySub: Subscription | undefined;

  constructor(private categoryService: CategoryService,
              private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private sanitizer: DomSanitizer,
              private _formBuilder: FormBuilder,
              private matDialog: MatDialog,
              private imageService: ImageService,
              private router: Router,
              private varietyService: VarietyService) {
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      const refId = params['ref_id'];
      this.productSub= this.productService.getProductByRefId(refId).subscribe((res) => {
        this.product = res;
        if(this.product!.images!.length>0){
          for(let image of this.product!.images!){
            this.imageSub = this.imageService.urlToFile(image.url).subscribe(file => {
              if(file){
                const imageFile = {
                  file: file,
                  url: this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(file))
                };
                this.images.push(imageFile);
              }
            });
          }
        }
        this.varietyService.refresh();
        if(this.product!.varieties!.length>0){
          for(let variety of this.product.varieties!){
            this.varietyService.add(variety);
          }
        }
      })
    });

    this.categorySub = this.categoryService.getLastNodeCategories().subscribe((res)=>{
      this.categories = res;
    });
    this.varietyService.refresh();
    this.varieties = this.varietyService.getVarieties();

  }

  onSaveForm(productForm: NgForm) {
    this.varieties.subscribe((res)=>{this.product.varieties = res});
    this.productService.editProduct(this.prepareFormData(),this.product.refId!).subscribe((res)=>{})
    this.varietyService.refresh();
  }

  prepareFormData(): FormData{
    const formData = new FormData();
    console.log(JSON.stringify(this.product));
    formData.append("product", new Blob([JSON.stringify(this.product)], {type: 'application/json'}));
    this.images.forEach((image)=>{
      if(image){
        formData.append('images',image!.file, image!.file.name);
      }
    });
    return formData;
  }

  clearForm(productForm: NgForm):void{
    this.router.navigate(['admin/product']).then();
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

  varietiesObservable(): Observable<ProductVariety[]>{
      return this.varietyService.getVarieties();
  }

  removeVariety(variety: ProductVariety) {
    this.varietyService.remove(variety.code!);
  }

  ngOnDestroy(): void{
    if(this.imageSub){
      this.imageSub.unsubscribe();
    }
    if(this.productSub){
      this.productSub.unsubscribe();
    }
    if(this.routeSub){
      this.routeSub.unsubscribe();
    }
  }

  compareCategories(optionValue: Category, productCategory: Category) : boolean{
    return optionValue.refId === productCategory.refId;
  }

}
