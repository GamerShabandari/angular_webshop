import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/IProduct';
import { GetproductsService } from 'src/app/services/getproducts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: IProduct[] = []

  constructor(private service: GetproductsService) { }

  ngOnInit(): void {
    this.service.products$.subscribe((productsFromService) => {
      this.products = productsFromService;
      
    });

    this.service.getProducts();
  }

  showDetails(productId:string){
    
  }

}
