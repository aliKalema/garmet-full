import {Component, OnDestroy, OnInit} from '@angular/core';
import {Category} from "../../interfaces/category";
import {CategoryService} from "../../services/category.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit, OnDestroy{


  categories: Array<Category> =[];
  private catSub: Subscription | undefined;
  constructor(private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.catSub = this.categoryService.getLastNodeCategories().subscribe((res)=>{
      this.categories = res;
    })
  }

  onShowCategory(category: any) {

  }

  ngOnDestroy() {
    if(this.catSub){
      this.catSub.unsubscribe();
    }
  }
}
