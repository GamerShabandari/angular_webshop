import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IOrder } from 'src/app/models/Order';
import { IProduct } from 'src/app/models/IProduct';
import { IUser } from 'src/app/models/User';
import { OrderRow } from 'src/app/models/OrderRow';
import { GetproductsService } from 'src/app/services/getproducts.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],

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
export class CheckoutComponent implements OnInit {

  userForm = new FormGroup({
    firstname: new FormControl("", [Validators.required, Validators.minLength(3)]),
    lastname: new FormControl("", [Validators.required, Validators.minLength(3)]),
    street: new FormControl("", [Validators.required, Validators.minLength(3)]),
    city: new FormControl("", [Validators.required, Validators.minLength(3)]),
    country: new FormControl("", [Validators.required, Validators.minLength(3)]),
    phoneNr: new FormControl("", [Validators.required, Validators.pattern("^((\\+46-?)|0)?[0-9]{10}$")]),
    email: new FormControl("", [Validators.required, Validators.email]),
    payment: new FormControl("", [Validators.required])

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

    let createdUser = new IUser(this.userForm.value.firstname, this.userForm.value.lastname, this.userForm.value.street, this.userForm.value.city, this.userForm.value.country, this.userForm.value.phoneNr, this.userForm.value.email, this.userForm.value.payment)
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
      let newOrder = new IOrder(user, totalPrice, this.checkoutItems, user.payment)

      this.service.makePurchase(newOrder)

      this.service.updateBasketItemNumber(0)
      localStorage.setItem("amountOfItemsInBasket", JSON.stringify(0))

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
