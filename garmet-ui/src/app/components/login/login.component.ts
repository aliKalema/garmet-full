import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormBuilder, Validators} from "@angular/forms";
import {User} from "../../interfaces/user";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginSub: Subscription | undefined;
  profileSub: Subscription | undefined;
  constructor(private changeDetectorRef: ChangeDetectorRef,
              private authService: AuthService,
              private router: Router,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
  }


  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

  submitLogin() {
    if (this.loginForm.value.username != null && this.loginForm.value.password != null) {
      this.loginSub = this.authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe((res)=>{
        this.profileSub = this.authService.loadProfile().subscribe((res)=>{
          if (res.roles && res.roles.length > 0) {
            for (let role of res.roles) {
              if (role.name === 'ADMIN') {
                this.router.navigate(['/admin/product']).then();
              }
            }
          }
          else{
            this.router.navigate(['/product']).then();
          }
        })
      });
    }
  }

  ngOnDestroy() {
    if(this.profileSub){
      this.profileSub.unsubscribe();
    }
    if(this.loginSub){
      this.loginSub.unsubscribe();
    }
  }
}
