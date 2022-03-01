import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/models/ICategory';
import { IProduct } from 'src/app/models/IProduct';
import { GetproductsService } from 'src/app/services/getproducts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  chosenCategory:number = 0

  products: IProduct[] = []

  categories: ICategory[] = []

  searchResult: IProduct[] = []

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
