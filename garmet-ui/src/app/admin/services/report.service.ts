import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Summary} from "../interfaces/summary";

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private httpClient: HttpClient) { }

  getSummary(): Observable<Summary> {
    return  this.httpClient.get<Summary>(`${environment.backend.url}/api/report`);
  }
}

