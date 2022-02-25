import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/models/IProduct';
import { GetproductsService } from 'src/app/services/getproducts.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  testProductIDString: string = ""

  productId: number = 0;
  products: IProduct[] = []
  productToShow: IProduct = {
    id: 0,
    name: "",
    description: "",
    price: 0,
    imageUrl: "",
    year: 0,
    added: new Date(),
    productCategory: [{ categoryId: 0, category: "" }]
  }



  constructor(private route: ActivatedRoute, private service: GetproductsService) { }

  ngOnInit(): void {
    this.route.params.subscribe((p) => {
      this.productId = +p["id"];
      this.testProductIDString = p["id"];

      this.service.products$.subscribe((productsFromService) => {
        this.products = productsFromService;
      });

      this.service.getProducts()

      this.productToShow = this.getDetails(+p["id"])
    })

  }

  getDetails(productId: number) :any {

    //let match;

    for (let i = 0; i < this.products.length; i++) {
      const p = this.products[i];

      if (p.id === productId) {

        return p
        //match = product
        // this.productToShow = product
        // console.log(product);
      }
      //return match
    }
  }
}
