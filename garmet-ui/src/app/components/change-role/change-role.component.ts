import {Component, Inject, OnInit} from '@angular/core';
import {MatRadioModule} from "@angular/material/radio";
import {AuthService} from "../../services/auth.service";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {CartItem} from "../../interfaces/cart-item";
import {User} from "../../interfaces/user";
import {UsersService} from "../../services/users.service";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-change-role',
  templateUrl: './change-role.component.html',
  styleUrls: ['./change-role.component.css'],
  imports: [
    MatRadioModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule
  ],
  standalone: true
})
export class ChangeRoleComponent implements OnInit{
  role:  'ADMIN' | 'USER' = 'USER';

  constructor(@Inject(MAT_DIALOG_DATA) public user: User, private userService: UsersService, private dialogRef: MatDialogRef<ChangeRoleComponent>) {
  }

  ngOnInit(): void {
    if(this.user.roles){
      let isAdmin = false;
      for(let role of this.user.roles){
        if(role.name === "ADMIN"){
          this.role = 'ADMIN';
        }
      }
    }
  }

  onSave(){
    this.user.roles = [ { id: 0, name: this.role } ];
    this.userService.updateUser(this.user);
  }



}
