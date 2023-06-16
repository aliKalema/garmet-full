import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {map, Observable, BehaviorSubject} from "rxjs";
import {NotificationService} from "./notification.service";
import {Product} from "../interfaces/product";
import {environment as env} from "../../environments/environment";
import {PageState} from "../interfaces/page-state";
import {Page} from "../interfaces/page";
export declare type DisplayMode = 'TABLE' | 'GRID';
export declare type Sort = 'desc' | 'asc';
@Injectable({
  providedIn: 'root'
})
//TODO implement sort By
export class ProductService {
  private productPageState = new BehaviorSubject<PageState>({pageIndex: 0, pageSize: 10, filtered: false});
  private products: BehaviorSubject<Array<Product>> = new BehaviorSubject<Array<Product>>([]);
  constructor(private httpClient: HttpClient,
              private notificationService: NotificationService) {
    this.loadProducts()
  }

  addProduct(formData: FormData):Observable<Product> {
    return this.httpClient.post<Product>(`${env.backend.url}/api/v1/products`, formData).pipe(map((res)=>{
      this.notificationService.notify('Product Added Successfully', 'success');
      return res;
    }))
  }

  editProduct(formData: FormData, refId: string) {
    return this.httpClient.put<Product>(`${env.backend.url}/api/v1/products/${refId}`, formData).pipe(map((res)=>{
      this.notificationService.notify('Product Added Successfully', 'success');
      return res;
    }))
  }

  getProductByRefId(refId: string): Observable<Product> {
    let params = new HttpParams();
    params.append("ref_id", refId);
    return this.httpClient.get<Product>(`${env.backend.url}/api/v1/products/${refId}`);
  }


  public setProductState(pageState: PageState): void{
    const currentParentState =  this.productPageState.value;
    if(!(currentParentState.pageIndex === pageState.pageIndex && currentParentState.pageSize === pageState.pageSize && currentParentState.searchTerm ===pageState.searchTerm )){
      this.productPageState.next(pageState);
      this.loadProducts();
    }
  }

  private loadProducts() {
    this.fetchProducts().subscribe((page: Page<Product>)=>{
      const prods: Array<Product> = page.content;
      const pageState = this.productPageState.value;
      pageState.totalPages = page.totalPages;
      pageState.totalElements = page.totalElements;
      this.productPageState.next(pageState);
      this.products.next(prods);
    })
  }

  private fetchProducts(): Observable<Page<Product>> {
    const pageState =  this.productPageState.value;
    let params = new HttpParams();
    params = params.append("page", pageState.pageIndex);
    params = params.append("size", pageState.pageSize);
    if(pageState.filtered && pageState.searchTerm){
      params = params.append("search_term", pageState.searchTerm);
    }
    return this.httpClient.get<Page<Product>>(`${env.backend.url}/api/v1/products`,{params: params}).pipe(map((res)=>{
      const page = res;
      pageState.totalPages = page.totalPages;
      pageState.totalElements = page.totalElements;
      this.setProductState(pageState);
      if(page.content.length>0){
        for(let prod of page.content){
          this.transformProduct(prod);
        }
      }
      return page;
    }))
  }

  getProducts():Observable<Product[]>{
    return this.products.asObservable();
  }

  handleSearch(searchTerm: string) {
    this.setProductState({pageIndex:0,pageSize:10,filtered: true,searchTerm: searchTerm});
  }

  reset() {
    this.setProductState({pageIndex: 0, pageSize: 10, filtered: false})
  }

  transformProduct(product: Product): void{
    if(product.varieties && product.varieties.length>0){
      let worth: number =0;
      let totalQuantity: number = 0;
      for(let variety of product.varieties){
        worth = worth+ variety.price * variety.quantity;
        totalQuantity= totalQuantity + variety.quantity;
      }
      product.worth = worth;
      product.totalQuantity = totalQuantity;
    }
  }

  deleteProduct(refId: string) {
    this.httpClient.delete(`${env.backend.url}/api/products/${refId}`).subscribe();
  }

  getPageState(): Observable<PageState> {
    return this.productPageState.asObservable();
  }

}
