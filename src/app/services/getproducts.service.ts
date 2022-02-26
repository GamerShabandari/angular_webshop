import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ICategory } from '../models/ICategory';
import { IOrder } from '../models/Iorder';
import { IProduct } from '../models/IProduct';

@Injectable({
  providedIn: 'root'
})
export class GetproductsService {

  private products = new Subject<IProduct[]>();
  public products$ = this.products.asObservable();

  private categories = new Subject<ICategory[]>();
  public categories$ = this.categories.asObservable();

  private ordersArray: IOrder[] = []
  ////// ändra nedan och ovan till observable istället !? ////// Kolla mer info i checkout.ts filen
  public checkoutItems: IProduct[] = []

  constructor(private http: HttpClient) { }

  getProducts() {

    this.http.get<IProduct[]>("https://medieinstitutet-wie-products.azurewebsites.net/api/products").subscribe((data: IProduct[]) => {
      this.products.next(data);

    })
  }

  getCategoriesFromApi() {

    this.http.get<ICategory[]>("https://medieinstitutet-wie-products.azurewebsites.net/api/categories").subscribe((data: ICategory[]) => {
      this.categories.next(data);

    })
  }

  addItemToCheckout(item: IProduct) {

    this.checkoutItems.push(item);
  }

  getCheckoutItems(): IProduct[] {

    return this.checkoutItems
  }

  makePurchase(order: IOrder) {

    this.ordersArray.push(order);

  }

  showOrdersToAdmin(): IOrder[] {

    return this.ordersArray
  }

  letAdminChangeOrder(index: number) {

    this.ordersArray.splice(index, 1)

  }
}
