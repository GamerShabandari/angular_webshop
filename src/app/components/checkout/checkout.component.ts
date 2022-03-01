import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IOrder } from 'src/app/models/Iorder';
import { IProduct } from 'src/app/models/IProduct';
import { IUser } from 'src/app/models/IUser';
import { OrderRow } from 'src/app/models/OrderRow';
import { GetproductsService } from 'src/app/services/getproducts.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  userForm = new FormGroup({
    firstname: new FormControl("", [Validators.required, Validators.minLength(3)]),
    lastname: new FormControl("", [Validators.required, Validators.minLength(3)]),
    street: new FormControl("", [Validators.required, Validators.minLength(3)]),
    zip: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(5), Validators.pattern("^[0-9]*$")]),
    city: new FormControl("", [Validators.required, Validators.minLength(3)]),
    country: new FormControl("", [Validators.required, Validators.minLength(3)]),
    phoneNr: new FormControl("", [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    email: new FormControl("", [Validators.required, Validators.email])

  })

  madePurchase:boolean = false;

  checkoutItems: IProduct[] = []

  constructor(private service: GetproductsService) { }

  ngOnInit(): void {
    let checkoutItemsSerialized: string = localStorage.getItem("checkoutItems") || "[]";
    this.checkoutItems = JSON.parse(checkoutItemsSerialized);
    this.madePurchase = false;
  }

  saveUser() {

    let createdUser = new IUser(this.userForm.value.firstname, this.userForm.value.lastname, this.userForm.value.street, this.userForm.value.zip, this.userForm.value.city, this.userForm.value.country, this.userForm.value.phoneNr, this.userForm.value.email,)
    this.makePurchase(createdUser)
    this.userForm.reset()

  }

  makePurchase(user: IUser) {

    if (this.checkoutItems.length >= 1) {

      let totalPrice: number = 0;

      for (let i = 0; i < this.checkoutItems.length; i++) {
        const item = this.checkoutItems[i];

        totalPrice += item.price;
      }
      let newOrder = new IOrder(user, totalPrice, this.checkoutItems)

      this.service.makePurchase(newOrder)
      this.service.updateBasketItemNumber(0)

      this.checkoutItems = []
      localStorage.setItem("checkoutItems", JSON.stringify(this.checkoutItems))

      this.madePurchase = true

    } else {
      return
    }
  }

  deleteItem(index: number) {
    this.checkoutItems.splice(index, 1)
    localStorage.setItem("checkoutItems", JSON.stringify(this.checkoutItems))
    this.service.updateBasketItemNumber(this.checkoutItems.length)
    localStorage.setItem("amountOfItemsInBasket", JSON.stringify(this.checkoutItems.length))
  }

}
