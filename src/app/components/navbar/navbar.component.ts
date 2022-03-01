import { Component, OnInit } from '@angular/core';
import { GetproductsService } from 'src/app/services/getproducts.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  amountOfItemsInBasket: number = 0

  constructor(private service: GetproductsService) { }

  ngOnInit(): void {

    this.service.amountOfItems$.subscribe((amountOfItemsFromService) => {
      this.amountOfItemsInBasket = amountOfItemsFromService;
    });

    let amountOfItemsInBasketSerialized: string = localStorage.getItem("amountOfItemsInBasket") || "[]";
    this.amountOfItemsInBasket = JSON.parse(amountOfItemsInBasketSerialized);

  }

}
