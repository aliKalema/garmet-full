import {Component, OnInit} from '@angular/core';
import {LoadingService} from "./services/loading.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'garmet-ui';
  isLoading: boolean= false;

  constructor(private loadingService: LoadingService) {
  }
  ngOnInit(): void {
    this.loadingService.isLoading.subscribe((val)=>{
      this.isLoading = val;
    })
  }

}
