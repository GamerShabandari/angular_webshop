import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/app/models/Iorder';
import { IProduct } from 'src/app/models/IProduct';
import { GetproductsService } from 'src/app/services/getproducts.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  checkoutItems: IProduct[] = []

  constructor(private service: GetproductsService) { }

  ngOnInit(): void {
    this.checkoutItems = this.service.getCheckoutItems()
  }

  makePurchase() {
    if (this.checkoutItems.length >= 1) {
      console.log("fanns något");

      //skapa korrekt formaterat order, skicka tillbaka till service som sedan skickar till API
      let totalPrice: number = 0;

      for (let i = 0; i < this.checkoutItems.length; i++) {
        const item = this.checkoutItems[i];

        totalPrice += item.price;

      }

      let newOrder = new IOrder(totalPrice, this.checkoutItems)

      this.service.makePurchase(newOrder)
      ////////////////////////////////////////////////////////////////////////////////////////////////////////
      //// ändra dem nedre två raderna till att bli en observable istället för två olika arrays på två platser
      ////////////////////////////////////////////////////////////////////////////////////////////////////////
      this.service.checkoutItems = []

      this.checkoutItems = []

      ////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////


    } else {
      return
    }
  }

  deleteItem(index: number) {
    this.checkoutItems.splice(index, 1)
  }

}
