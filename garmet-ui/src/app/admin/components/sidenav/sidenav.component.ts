import {Component, Input, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {NavigationService} from "../../../services/navigation.service";
import {AuthService} from "../../../services/auth.service";
import {User} from "../../../interfaces/user";
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})

export class SidenavComponent implements OnInit{

  isMinimized!: boolean;
  profile!: User;

  constructor(private navigationService: NavigationService, private authService: AuthService) {}

  ngOnInit(): void {
    this.navigationService.isMinimized().subscribe((data)=>{
      this.isMinimized = data;
    })
    this.authService.loadProfile().subscribe((res)=>{
      this.profile = res;
    })
  }
}
