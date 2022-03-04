import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/models/IProduct';
import { GetproductsService } from 'src/app/services/getproducts.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],

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
export class DetailsComponent implements OnInit {

  productId: number = 0;
  products: IProduct[] = []
  checkoutItems: IProduct[] = []

  constructor(private route: ActivatedRoute, private service: GetproductsService) { }

  ngOnInit(): void {
    this.route.params.subscribe((p) => {
      this.productId = +p["id"];
    })
    this.service.products$.subscribe((productsFromService) => {
      this.products = productsFromService;
    });
    this.service.getProducts()

    /////////////////////////////////////  localstorage /////////////////////////////////////////////
    let checkoutItemsSerialized: string = localStorage.getItem("checkoutItems") || "[]";
    this.checkoutItems = JSON.parse(checkoutItemsSerialized);
    //////////////////////////////////////////////////////////////////////////////////////////////////

  }


  attItemToCheckout(item: IProduct) {

    this.checkoutItems.push(item);
    localStorage.setItem("checkoutItems", JSON.stringify(this.checkoutItems));

    this.service.updateBasketItemNumber(this.checkoutItems.length)
    localStorage.setItem("amountOfItemsInBasket", JSON.stringify(this.checkoutItems.length))

  }
}
