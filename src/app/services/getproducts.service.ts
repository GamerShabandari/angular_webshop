import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IProduct } from '../models/IProduct';

@Injectable({
  providedIn: 'root'
})
export class GetproductsService {

  private products = new Subject<IProduct[]>();
  public products$ = this.products.asObservable();

  private checkoutItems = new Subject<IProduct[]>();
  public checkOutItems = this.checkoutItems.asObservable();

  constructor(private http: HttpClient) { }

  getProducts(){
    this.http.get<IProduct[]>("https://medieinstitutet-wie-products.azurewebsites.net/api/products").subscribe((data:IProduct[]) => {
      this.products.next(data);
    })
  }
  addItemToCheckout(item:IProduct){

  }
}
