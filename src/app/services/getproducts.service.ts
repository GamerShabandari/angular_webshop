import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IOrder } from '../models/Iorder';
import { IProduct } from '../models/IProduct';

@Injectable({
  providedIn: 'root'
})
export class GetproductsService {

  private products = new Subject<IProduct[]>();
  public products$ = this.products.asObservable();

  private ordersArray: IOrder[] = []
  private orders = new Subject<IOrder[]>();
  public orders$ = this.orders.asObservable();

  ////// ändra nedan till observable istället !? ////// Kolla mer info i checkout.ts filen
  public checkoutItems: IProduct[] = []

  constructor(private http: HttpClient) { }

  getProducts(){
    this.http.get<IProduct[]>("https://medieinstitutet-wie-products.azurewebsites.net/api/products").subscribe((data:IProduct[]) => {
      this.products.next(data);
    })
  }
  addItemToCheckout(item:IProduct){
    this.checkoutItems.push(item);
  }

  getCheckoutItems():IProduct[]{
    return this.checkoutItems
  }

  makePurchase(order:IOrder){
    console.log(order);
    this.ordersArray.push(order);
    this.orders.next(this.ordersArray)
  }
}
