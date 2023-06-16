import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Role, User} from "../interfaces/user";
import {environment as env} from "../../environments/environment";
import {UserRoleMap} from "../admin/interfaces/user-role-map";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) { }

  getUsers(): Observable<User[]>{
    return this.httpClient.get<User[]>(`${env.backend.url}/api/users`);
  }

  createUser( user: User): void{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
     this.httpClient.post<User>(`${env.backend.url}/api/signup`,user ,{headers}).subscribe((res)=>{
      if(res){
        this.snackBar.open(`User Created Successfully`, 'Ok', { duration: 3000 });
      }
    })
  }

  getRoles(): Observable<Role[]>{
    return this.httpClient.get<Role[]>(`${env.backend.url}/api/roles`);
  }

  createRole(role: Role): void{
     this.httpClient.post<Role>(`${env.backend.url}/api/roles`,role).subscribe();
  }

  addRoleToUser(userRoleMap: UserRoleMap): Observable<any> {
    return this.httpClient.post<any>(`${env.backend.url}/api/roles/map'`,userRoleMap);
  }

  removeRoleToUser(userRoleMap: UserRoleMap): Observable<any> {
    return this.httpClient.put<any>(`${env.backend.url}/api/roles/map'`,userRoleMap);
  }

  deleteUser(id: number): void {
     this.httpClient.delete<any>(`${env.backend.url}/api/users/${id}`).subscribe((res)=>{
       this.snackBar.open(`User Deleted Successfully`, 'Ok', {
         duration: 3000,
       });
     })
  }

  updateUser(user: User) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    this.httpClient.put<any>(`${env.backend.url}/api/users`,user ,{headers}).subscribe((res)=>{
      this.snackBar.open(`User Updated`, 'Ok', {
        duration: 3000,
      });
    })
  }
}
