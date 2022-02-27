import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/app/models/Iorder';
import { GetproductsService } from 'src/app/services/getproducts.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  orders: IOrder[] = []

  constructor(private service: GetproductsService) { }

  ngOnInit(): void {
    this.orders = this.service.showOrdersToAdmin()
  }

  removeOrder(index: number) {
    
    this.service.letAdminChangeOrder(index);
    this.orders = this.service.showOrdersToAdmin()
   
  }
}