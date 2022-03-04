import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/app/models/Order';
import { IProduct } from 'src/app/models/IProduct';
import { GetproductsService } from 'src/app/services/getproducts.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],

  animations: [
    trigger("itemAnim",[
      transition("void => *", [
        style({
          opacity: 0,
          transform: 'scale(0)'
        }),
        animate('200ms', style({
          opacity: 1,
          transform: 'scale(1)'
        }))
      ])
    ])
  ]
})
export class AdminComponent implements OnInit {

  orders: IOrder[] = []

  products: IProduct[] = []

  constructor(private service: GetproductsService) { }

  ngOnInit(): void {

    this.service.products$.subscribe((productsFromService) => {
      this.products = productsFromService;  
    });
    this.service.getProducts();

    this.service.orders$.subscribe((ordersFromService) => {
    this.orders = ordersFromService;  
    });
    this.service.getOrderToAdmin()

  }

  removeOrder(id: number) {
    
    this.service.letAdminDeleteOrder(id);
       
  }
}