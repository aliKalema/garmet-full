import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {BehaviorSubject, map, Observable} from "rxjs";
import {Category} from "../interfaces/category";
import {environment as env} from "../../environments/environment";
import {NotificationService} from "./notification.service";
import {Page} from "../interfaces/page";
import {PageState} from "../interfaces/page-state";
export declare type CategoryParams={
  parent: boolean;
}
export declare type CategoryHierarchy='LAST_NODE' | 'PARENT' | 'NONE';
export declare type SearchConfig = {
  parent?: boolean,
  categoryHierarchy?: CategoryHierarchy,
  searchTerm: string,
  pageSize?: number,
  pageNumber?: number
}
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private parentCategories: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);

  private lastNodeCategories: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);

  private allCategories: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);

  private parentCategoriesState = new BehaviorSubject<PageState>({
    pageIndex: 0,
    pageSize: 10,
  });

  private allCategoriesState = new BehaviorSubject<PageState>({
    pageIndex: 0,
    pageSize: 10,
  });

  private lastNodeCategoryState = new BehaviorSubject<PageState>({
    pageIndex: 0,
    pageSize: 10,
  });

  private params: CategoryParams={
    parent:false
  }
  constructor(private httpClient: HttpClient, private notificationService: NotificationService){
    this.loadAllCategories();
    this.loadParentCategories();
    this.loadLastNodeCategories();
  }

  public getAllCategories(): Observable<Category[]>{
    return this.allCategories.asObservable();
  }

  public loadAllCategories(): void{
    this.fetchCategories(this.allCategoriesState.value,'NONE').subscribe((page: Page<Category>)=>{
      this.allCategories.next(page.content);
    })
  }

  public setAllCategoriesState(parentState: PageState): void{
    const areEqual = JSON.stringify(this.allCategoriesState.value) === JSON.stringify(parentState);
    if(!areEqual){
      this.allCategoriesState.next(parentState);
      this.loadAllCategories();
    }
  }

  public getLastNodeCategories(): Observable<Category[]>{
    return this.lastNodeCategories.asObservable();
  }

  public loadLastNodeCategories(): void{
    this.fetchCategories(this.lastNodeCategoryState.value, 'LAST_NODE').subscribe((page: Page<Category>)=>{
      this.lastNodeCategories.next(page.content);
    })
  }

  public setLastNodeCategoryState(categoriesState: PageState): void{
    const areEqual = JSON.stringify(this.lastNodeCategoryState.value) === JSON.stringify(categoriesState);
    if(!areEqual){
      this.lastNodeCategoryState.next(categoriesState);
      this.loadLastNodeCategories();
    }
  }

  public getParentCategories(): Observable<Category[]>{
    return this.parentCategories.asObservable();
  }

  public loadParentCategories(): void{
    this.fetchCategories(this.parentCategoriesState.value, 'PARENT').subscribe((page: Page<Category>)=>{
      this.parentCategories.next(page.content);
    })
  }

  public setParentCategoryState(categoriesState: PageState): void{
    const areEqual = JSON.stringify(this.parentCategoriesState.value) === JSON.stringify(categoriesState);
    if(!areEqual){
      this.parentCategoriesState.next(categoriesState);
      this.loadParentCategories();
    }
  }

  private fetchCategories(paginationState: PageState, categoryHierarchy?: CategoryHierarchy , searchTerm?: string ): Observable<Page<Category>> {
    let params = new HttpParams();
    params.append("page", paginationState.pageIndex);
    params.append("size", paginationState.pageSize);
    if(categoryHierarchy){
      params = params.append("hierarchy", categoryHierarchy);
    }
    if(searchTerm)
      params = params.append("search_term", searchTerm);
    return this.httpClient.get<Page<Category>>(`${env.backend.url}/api/v1/categories`,{params: params});
  }

  createCategory(category: Category): Observable<Category> {
    return this.httpClient.post<Category>(`${env.backend.url}/api/v1/categories`, JSON.stringify(category),{
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      map((res)=>{
      this.notificationService.notify("Category Added Successfully", "success");
      return res;
    }));
  }

  public searchCategory(searchConfig: SearchConfig ): Observable<Page<Category>>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append("search_term", searchConfig.searchTerm);
    if(searchConfig.pageNumber){
      queryParams = queryParams.append("page",searchConfig.pageNumber);
    }
    if(searchConfig.pageSize){
      queryParams = queryParams.append("size",searchConfig.pageSize);
    }
    if(searchConfig.categoryHierarchy){
      queryParams = queryParams.append("hierarchy",searchConfig.categoryHierarchy);
    }
    return this.httpClient.get<Page<Category>>(`${env.backend.url}/api/v1/categories`,{params:queryParams})
  }
}
