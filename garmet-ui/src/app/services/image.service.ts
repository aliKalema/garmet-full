import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  constructor(private httpClient: HttpClient) { }

  public urlToFile(url: string): Observable<File > {
    return this.httpClient.get(url, { responseType: 'blob', observe: 'response' }).pipe(
      map(response => {
        const contentDisposition = response.headers.get('Content-Disposition');
        let fileName = 'unknown';
        if (contentDisposition) {
          const match = contentDisposition.match(/filename="(.+)"/);
          if (match) {
            fileName = match[1];
          }
        }
        return new File([response.body!], fileName, { type: response.body!.type});
      }))
  }
}
