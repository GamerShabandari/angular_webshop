import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/app/models/Order';
import { IProduct } from 'src/app/models/IProduct';
import { GetproductsService } from 'src/app/services/getproducts.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
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