import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {ProductVariety} from "../../interfaces/product-variety";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {environment as env} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class VarietyService {
  private varieties: BehaviorSubject<Array<ProductVariety>> =  new BehaviorSubject<Array<ProductVariety>>([]);
  constructor(private snackBar: MatSnackBar, private httpClient: HttpClient) { }
  public getVarieties(): Observable<Array<ProductVariety>>{
    return  this.varieties.asObservable();
  }

  public refresh(): void{
    this.varieties.next([]);
  }

  public add(variety: ProductVariety): void{
    const arr =  this.varieties.value;
    variety.code = arr.length;
    arr.push(variety);
    this.varieties.next(arr);
  }

  public remove(index: number):void{
    const arr =  this.varieties.value;
    arr.splice(index,1);
    this.varieties.next(arr);
    this.snackBar.open(`1 product variety removed`, 'Ok', {
      duration: 3000,
    });
  }

  public updateVariety(variety: ProductVariety, server: boolean): void{
    if(server){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
      this.httpClient.put<any>(`${env.backend.url}/api/v1/products/variety/${variety.refId!}`,variety ,{headers}).subscribe((res)=>{
        this.snackBar.open(`Product Variety  Updated`, 'Ok', {
          duration: 3000,
        });
      })
    }
    else{
      const arr =  this.varieties.value;
      arr[variety.code!] =  variety;
      this.varieties.next(arr);
    }
  }
}
