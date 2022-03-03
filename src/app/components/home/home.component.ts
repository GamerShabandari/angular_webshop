import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/models/ICategory';
import { IProduct } from 'src/app/models/IProduct';
import { GetproductsService } from 'src/app/services/getproducts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
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
        })),
        animate(500)
      ])
    ])
    // ,

    // trigger("listAnim", [
    //   transition("* => *", [
    //     query(":enter", [
    //       style({
    //         opacity: 0,
    //       }),
    //       stagger(200, [
    //         animate("1.4s ease")
    //       ])
    //     ])
    //   ])
    // ])

  ]
})
export class HomeComponent implements OnInit {

  chosenCategory:number = 0

  products: IProduct[] = []

  categories: ICategory[] = []

  searchResult: IProduct[] = []

  checkoutItems: IProduct[] = []

  constructor(private service: GetproductsService) { }

  ngOnInit(): void {
    this.service.products$.subscribe((productsFromService) => {
      this.products = productsFromService;  
    });

    this.service.categories$.subscribe((categoriesFromService) => {
      this.categories = categoriesFromService;
    });

    this.service.getCategoriesFromApi();
    this.service.getProducts();

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

  searchProduct(usersSearch:string){
    if(usersSearch.length< 3){
      return
    }
    this.service.searchForProduct(usersSearch); 
    this.service.searchResult$.subscribe((searchResultsFromService) => {
      this.searchResult = searchResultsFromService;
    }) 
  }
}
