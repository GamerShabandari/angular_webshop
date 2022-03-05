import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, first, Observable, Subject } from 'rxjs';
import { ICategory } from '../models/ICategory';
import { IOrder } from '../models/Order';
import { IProduct } from '../models/IProduct';
import { IGetProductsService } from '../models/IGetProductsService';

@Injectable({
  providedIn: 'root'
})
export class GetproductsService implements IGetProductsService{

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

    // hämtar alla produkter från API och lagrar dem först i en privat Subject som sedan används för att skapa en public observable som komponenterna kan hämta data ifrån.

    this.http.get<IProduct[]>("https://medieinstitutet-wie-products.azurewebsites.net/api/products").subscribe((data: IProduct[]) => {
      this.products.next(data);
    })
  }

  getCategoriesFromApi() {

    // hämtar alla kategorier från API och lagrar dem först i en privat Subject som sedan används för att skapa en public observable som komponenterna kan hämta data ifrån.

    this.http.get<ICategory[]>("https://medieinstitutet-wie-products.azurewebsites.net/api/categories").subscribe((data: ICategory[]) => {
      this.categories.next(data);
    })
  }

  makePurchase(order: IOrder) {

    // funktion som kallas på från checkout komponenten när en användare genomför ett köp, order tas emot och skickas då till API för att lagras.

    const httpHeaders = new HttpHeaders();
    httpHeaders.append('', 'aplication/json');
    return this.http.post('https://medieinstitutet-wie-products.azurewebsites.net/api/orders', order, { headers: httpHeaders}).subscribe((result) => {
      //console.warn(result)
    });
  }


  getOrderToAdmin(){

    // funktion som kallas på från admin komponenten, visar alla odrar i API databas för admin.

    this.http.get<IOrder[]>("https://medieinstitutet-wie-products.azurewebsites.net/api/orders?companyId=42").subscribe((data: IOrder[]) => {

      this.orders.next(data);

    })
  }

  letAdminDeleteOrder(id: number) {

    // funktion som låter admin radera en given order från API/databas, tar emot orderid och raderar därefter just den från API/databas.

    this.http.delete("https://medieinstitutet-wie-products.azurewebsites.net/api/orders/"+id+"?companyId=42")
        .subscribe(() => this.getOrderToAdmin());
  } 

  searchForProduct(usersSearch: string) {

    // funktion som körs när användaren använt sökfältet på sidan, hämta produkter från API som matchar det som skrivits i sökfält.

    this.http.get<IProduct[]>("https://medieinstitutet-wie-products.azurewebsites.net/api/search?searchText=" + usersSearch).subscribe((data: IProduct[]) => {
      this.searchResult.next(data);
    })
  }

  // funktion som körs varje gång användaren lägger till eller raderar något från varukorgen, används för att ge feedback i form av en liten badge vid varukorgen som visar antal produkter i korgen.

  updateBasketItemNumber(amountOfItems: number) {
    this.amountOfItems.next(amountOfItems)
  }

}
