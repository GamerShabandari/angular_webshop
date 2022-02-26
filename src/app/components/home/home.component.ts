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

  products: IProduct[] = []

  categories: ICategory[] = []

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

  getProducts(){
    this.service.getProducts();
  }

  filterByCategory(categoryId:number){
    console.log(categoryId);

    for (let i = 0; i < this.products.length; i++) {
      const product = this.products[i];
      let thisIndex = i;

      for (let i = 0; i < product.productCategory.length; i++) {
        const category = product.productCategory[i];

        if (category.id !== categoryId) {

          this.products.splice(thisIndex,1)

          
        }
        
      }
      
    }
    
  }

}
