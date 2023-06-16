import {Component, OnInit} from '@angular/core';
import {WishlistService} from "../../services/wishlist.service";

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit{
  constructor(private wishlistService: WishlistService) {
  }
  ngOnInit(): void {
  }

}
