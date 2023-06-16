import {Component, OnInit} from '@angular/core';
import {User} from "../../../interfaces/user";
import {UsersService} from "../../../services/users.service";
import {ChangeRoleComponent} from "../../../components/change-role/change-role.component";
import {MatDialog} from "@angular/material/dialog";
import {DeleteUserConfirmComponent} from "../../../components/delete-user-confirm/delete-user-confirm.component";
import {ReportService} from "../../services/report.service";
import {Summary} from "../../interfaces/summary";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  users!: User[];
  displayedColumns: string[] = ['firstName', 'lastName', 'username', 'phone', 'roles', 'action'];
   summary!: Summary;
  constructor(private usersService: UsersService, private matDialog: MatDialog, private reportServices: ReportService) {
  }
  ngOnInit(): void {
    this.usersService.getUsers().subscribe((res)=>{
      this.users=res;
    })
    this.reportServices.getSummary().subscribe((res: Summary)=>{
      this.summary =  res;
    })
  }

  changeRoles(user: User) {
    const dialogRef = this.matDialog.open(ChangeRoleComponent,{
      data: user,
      width: "35%",
    })
  }

  deleteUser(id: number) {
    const dialogRef = this.matDialog.open(DeleteUserConfirmComponent,{
      data: id,
      width: "40%",
    })
  }
}
