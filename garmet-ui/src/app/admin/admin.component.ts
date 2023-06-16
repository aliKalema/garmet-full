import {AfterViewInit, ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Link, NavigationService} from "../services/navigation.service";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {MatDrawerMode, MatSidenav} from "@angular/material/sidenav";
import {User} from "../interfaces/user";
import {AuthService} from "../services/auth.service";
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, AfterViewInit{
  isMobile: boolean= false;
  isMinimized: boolean= false;

  profile!: User;

  @ViewChild('sidenav')
  sidenav!: MatSidenav;

  @Output()
  maximize = new EventEmitter();
  constructor(private navigationService: NavigationService,
              private breakPointObserver: BreakpointObserver,
              private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.navigationService.isMinimized().subscribe((data)=>{
      this.isMinimized = data;
    })

  }

  ngAfterViewInit(): void {
    this.breakPointObserver.observe([Breakpoints.Small, Breakpoints.XSmall])
      .subscribe((breakpointState) => {
        if (breakpointState.matches) {
          this.isMobile=true;
          const over:MatDrawerMode ='over';
          if(this.sidenav) {
            this.sidenav.mode = "over";
            this.sidenav.close().then();
            this.navigationService.setMinimized(false);
          }
        }
        else{
          this.isMobile =  false;
          const side:MatDrawerMode ='side';
          if(this.sidenav) {
            this.sidenav.mode = "side";
            this.sidenav.open().then();
            this.navigationService.resetMinimized();
          }
        }
      });
    this.changeDetectorRef.detectChanges();
  }

  toggleSideNav(): void{
    if(this.isMobile){
      this.sidenav.toggle().then();
    }
    else{
      this.navigationService.toggleMinimized();
    }
  }


}
