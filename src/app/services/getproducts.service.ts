import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, first, Observable, Subject } from 'rxjs';
import { ICategory } from '../models/ICategory';
import { IOrder } from '../models/Order';
import { IProduct } from '../models/IProduct';

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

  private orders = new Subject<IOrder[]>();
  public orders$ = this.orders.asObservable();

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

    const httpHeaders = new HttpHeaders();
    httpHeaders.append('', 'aplication/json');
    return this.http.post('https://medieinstitutet-wie-products.azurewebsites.net/api/orders', order, { headers: httpHeaders}).subscribe((result) => {
      //console.warn(result)
    });
  }


  getOrderToAdmin(){
    this.http.get<IOrder[]>("https://medieinstitutet-wie-products.azurewebsites.net/api/orders?companyId=42").subscribe((data: IOrder[]) => {

      this.orders.next(data);

    })
  }

  letAdminDeleteOrder(id: number) {

    this.http.delete("https://medieinstitutet-wie-products.azurewebsites.net/api/orders/"+id+"?companyId=42")
        .subscribe(() => this.getOrderToAdmin());
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
