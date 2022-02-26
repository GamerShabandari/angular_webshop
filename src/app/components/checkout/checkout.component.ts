import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IOrder } from 'src/app/models/Iorder';
import { IProduct } from 'src/app/models/IProduct';
import { IUser } from 'src/app/models/IUser';
import { GetproductsService } from 'src/app/services/getproducts.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  userForm = new FormGroup({
    firstname: new FormControl(""),
    lastname: new FormControl(""),
    street: new FormControl(""),
    zip: new FormControl(""),
    city: new FormControl(""),
    country: new FormControl(""),
    phoneNr: new FormControl(""),
    email: new FormControl("")
    
  })

  checkoutItems: IProduct[] = []

  constructor(private service: GetproductsService) { }

  ngOnInit(): void {
    this.checkoutItems = this.service.getCheckoutItems()
  }

  saveUser(){

    console.log(this.userForm.value);
    let createdUser = new IUser(this.userForm.value.firstname,this.userForm.value.lastname,this.userForm.value.street,this.userForm.value.zip,this.userForm.value.city,this.userForm.value.country,this.userForm.value.phoneNr,this.userForm.value.email,)
    this.makePurchase(createdUser)
    
  }

  makePurchase(user:IUser) {
    if (this.checkoutItems.length >= 1) {
      console.log("fanns något");

      //skapa korrekt formaterat order, skicka tillbaka till service som sedan skickar till API
      let totalPrice: number = 0;

      for (let i = 0; i < this.checkoutItems.length; i++) {
        const item = this.checkoutItems[i];

        totalPrice += item.price;

      }

      let newOrder = new IOrder(user, totalPrice, this.checkoutItems)

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
