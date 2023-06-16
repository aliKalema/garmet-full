import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable, of, tap, throwError} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment as env} from "../../environments/environment.development";
import {Token} from "../interfaces/token";
import {User} from "../interfaces/user";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private  loggedIn: boolean = false;
  private profile: User | undefined;
  private refreshTokenInProgress: boolean = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(private httpClient: HttpClient, private router: Router, private snackBar: MatSnackBar) {
  }

  login(username: string, password: string): Observable<Token> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);
     return this.httpClient.post<Token>(`${env.backend.url}/api/login`,body, httpOptions).pipe(
       map((token)=>{
         if(token){
           localStorage.setItem("token",JSON.stringify(token));
           this.loggedIn = true;
         }
         this.loggedIn = true;
        return token;
      }),
      catchError(error => {
        this.snackBar.open(`Wrong Username or Password`, 'Ok', { duration: 2000 });
         return throwError(error);
      })
     );
  }

  loadProfile(): Observable<User>{
    if(this.profile){
      return of(this.profile);
    }
    else{
      return this.httpClient.get<User>(`${env.backend.url}/api/profile`).pipe(map((profile)=>{
        this.profile = profile;
        return profile;
      }));
    }

  }

  logout(): void {
    const token :Token = JSON.parse(localStorage.getItem('token')!);
    if(token){
      localStorage.removeItem('token');
      this.loggedIn = false;
      this.snackBar.open(` Logged Out`, 'Ok', { duration: 2000 });
      this.router.navigate(['/login']).then();
    }
  }

  isLoggedIn(): boolean {
    const token :Token = JSON.parse(localStorage.getItem('token')!);
    return token!== null ? true : false;
  }

  // refreshToken(): void{
  //   console.log("refreshing");
  //   const token: Token =  JSON.parse(localStorage.getItem('refresh_token')!);
  //   const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token.refresh_token);
  //     this.httpClient.get<Token>(`${env.backend.url}/api/token/refresh`, { headers: headers }).subscribe((res: Token)=>{
  //       localStorage.setItem('token', JSON.stringify(token));
  //       this.loggedIn = true;
  //     });
  // }

  public refreshToken(): Observable<Token> {
    if (!this.refreshTokenInProgress) {
      this.refreshTokenInProgress = true;
      this.refreshTokenSubject.next(null);
        const token: Token =  JSON.parse(localStorage.getItem('token')!);
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token.refresh_token);
      return this.httpClient.get<Token>(`${env.backend.url}/api/token/refresh`, { headers: headers })
        .pipe(
          // Handle successful token refresh
          tap((response) => {
            this.refreshTokenInProgress = false;
            this.refreshTokenSubject.next(response.access_token);
          }),
          // Handle token refresh error
          catchError((error) => {
            this.refreshTokenInProgress = false;
            // Handle error, e.g., redirect to login page
            return throwError(error);
          })
        );
    } else {
      return this.refreshTokenSubject.asObservable();
    }
  }

  signup(user: User): void{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this.httpClient.post<User>(`${env.backend.url}/api/user/save`,JSON.stringify(user),httpOptions);
  }

  hasRole(role: string) {
    return false;
  }
}
