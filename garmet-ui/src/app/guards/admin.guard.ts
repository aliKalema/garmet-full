import {ChangeDetectorRef, inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { map, Observable, of} from 'rxjs';

import {AuthService} from "../services/auth.service";
import { catchError } from 'rxjs/operators';
import {NotificationService} from "../services/notification.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private notificationService: NotificationService,private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(!this.authService.isLoggedIn() ){
      this.router.navigate(['login']).then();
      return this.router.createUrlTree(['/login']);
    }
    return this.authService.loadProfile().pipe(
      map((res) => {
        const profile = res;
        let authorised = false;
        if (profile.roles && profile.roles.length > 0) {
          for (let role of profile.roles) {
            if (role.name === 'ADMIN') {
              authorised = true;
              break;
            }
          }
        }
        if (authorised) {
          return true;
        } else {
          this.notificationService.notify(`You Don't Have Sufficient Authorization`, 'danger');
          return this.router.createUrlTree(['/product']);
        }
      })

    );

    //
    // else{
    //      this.authService.loadProfile().subscribe(res=>{
    //       const profile = res;
    //       let authorised = false;
    //       if(profile.roles && profile.roles.length>0){
    //         for(let role of profile.roles){
    //           if(role.name === 'ADMIN'){
    //             authorised = true;
    //             console.log(authorised);
    //             break;
    //           }
    //         }
    //       }
    //       if(authorised){
    //         console.log(JSON.stringify(profile));
    //         return true;
    //       }
    //       else{
    //         this.notificationService.notify(`You Don't Have Sufficient Authorization`, 'danger');
    //         return this.router.createUrlTree(['/product']);
    //       }
    //     })
    //
    //     this.notificationService.notify(`InSufficient Authorization`, 'danger');
    //     return this.router.createUrlTree(['/product']);
    // }

  }
}
