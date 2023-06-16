import {Component, OnInit} from '@angular/core';
import {Role, User} from "../../interfaces/user";
import {FormBuilder, FormControl, NgForm} from "@angular/forms";
import {FloatLabelType} from "@angular/material/form-field";
import {UsersService} from "../../services/users.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  user: User={
    firstName: "",
    lastName: "",
    phone: "",
    username: "",
    password: "",
  };
  confirmPassword: string ="";

  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  options = this._formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });
  constructor(private usersService: UsersService, private snackBar: MatSnackBar, private _formBuilder: FormBuilder,) {
  }
  ngOnInit(): void {

  }

  onSaveForm(categoryForm: NgForm) {
    if(this.confirmPassword === this.user.password){
      this.usersService.createUser(this.user);
    }
    else{
      this.snackBar.open(`Your Passwords dont match`, 'Ok', { duration: 3000 });
      this.user.password = "";
      this.confirmPassword = "";
    }
  }

  clearForm(signupForm: NgForm) {

  }
}
