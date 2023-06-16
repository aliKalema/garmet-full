import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../../services/order.service";
import {Order} from "../../../interfaces/order";
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class OrdersComponent implements OnInit{
  orders!: Order[];
  pageSizeOptions: Array<number>=[5,10,20,50,100]
  totalElements!:number;
  pageSize!: number;
  columnsToDisplay = ['firstName', 'lastName', 'phone','status', 'quantity', 'orderDate', 'total'];
  orderItemsColumns: string[] = ['productName', 'price', 'quantity'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: Order |  undefined;

  constructor(private orderService: OrderService) {
  }
  ngOnInit( ): void {
    this.orderService.getOrders().subscribe((res)=>{
      this.orders = res;
    })
  }

}
