import {Component, Inject} from '@angular/core';
import {UsersService} from "../../services/users.service";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-delete-user-confirm',
  templateUrl: './delete-user-confirm.component.html',
  styleUrls: ['./delete-user-confirm.component.css'],
  imports: [
    MatDialogModule
  ],
  standalone: true
})
export class DeleteUserConfirmComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public id: number, private usersService: UsersService, private dialogRef: MatDialogRef<DeleteUserConfirmComponent>) {
  }

  deleteUser(): void {
    this.usersService.deleteUser(this.id);
  }

  onCancel() {

  }
}
