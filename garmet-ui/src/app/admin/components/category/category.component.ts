import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Category} from "../../../interfaces/category";
import {FormBuilder, FormControl, NgForm} from "@angular/forms";
import {FloatLabelType} from "@angular/material/form-field";
import {CategoryService} from "../../../services/category.service";
import {Subscription} from "rxjs";
import {PageState} from "../../../interfaces/page-state";
import {MatSelect} from "@angular/material/select";
import {FlatTreeControl} from "@angular/cdk/tree";
import {TreeFlatNode} from "../../../interfaces/tree-flat-node";
import {MatTreeFlatDataSource, MatTreeFlattener} from "@angular/material/tree";
import {MatDialog} from "@angular/material/dialog";
import {CategoryAddComponent} from "../category-add/category-add.component";
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})

export class CategoryComponent implements OnInit, OnDestroy{
  subscriptions: Array<Subscription> =[];

  displayedColumns: string[] = ['name', 'count'];

  @ViewChild('categorySelect')
  categorySelect!: MatSelect

  private transformer = (category: Category, level: number) => {
    return {
      expandable: !!category.children && category.children!.length > 0,
      name: category.name,
      count: category.children!.length,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<TreeFlatNode>(node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this.transformer, node => node.level,
    node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  constructor(private categoryService: CategoryService,
              private matDialog: MatDialog) {}

  ngOnInit(): void {
    this.subscriptions.push(this.categoryService.getParentCategories().subscribe((res:Array<Category>)=>{
      this.dataSource.data = res;
    }));
  }

  openAddCategoryDialog() {
    const dialogRef = this.matDialog.open(CategoryAddComponent,{
      width: "50%",
    })
  }

  ngOnDestroy() :void{
    if (this.subscriptions.length>0) {
      this.subscriptions.forEach((sb: Subscription)=>{
        sb.unsubscribe();
      })
    }
  }
}
