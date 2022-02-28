import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, first, Observable, Subject } from 'rxjs';
import { ICategory } from '../models/ICategory';
import { IOrder } from '../models/Iorder';
import { IProduct } from '../models/IProduct';
import { IUser } from '../models/IUser';

@Injectable({
  providedIn: 'root'
})
export class GetproductsService {

  private amountOfItems = new Subject<number>();
  amountOfItems$ = this.amountOfItems.asObservable();

  private searchResult = new Subject<IProduct[]>();
  public searchResult$ = this.searchResult.asObservable();

  private products = new Subject<IProduct[]>();
  public products$ = this.products.asObservable();

  private categories = new Subject<ICategory[]>();
  public categories$ = this.categories.asObservable();

  private ordersArray: IOrder[] = []

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

  makePurchase(order: IOrder) {

    this.ordersArray.push(order);

    return this.http.post<IOrder>("https://medieinstitutet-wie-products.azurewebsites.net/api/orders", order)
  }

  showOrdersToAdmin(): IOrder[] {

    return this.ordersArray
  }

  letAdminChangeOrder(index: number) {

    this.ordersArray.splice(index, 1);

  }

  searchForProduct(usersSearch: string) {

    this.http.get<IProduct[]>("https://medieinstitutet-wie-products.azurewebsites.net/api/search?searchText=" + usersSearch).subscribe((data: IProduct[]) => {
      this.searchResult.next(data);
    })
  }

  updateBasketItemNumber(amountOfItems: number) {
    this.amountOfItems.next(amountOfItems)
  }

}
