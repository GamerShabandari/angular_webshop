import { IProduct } from "./IProduct";
import { IUser } from "./IUser";

export class IOrder {
    id: number;
    companyId: number;
    created: Date;
    createdBy: IUser;
    paymentMethod: string;
    totalPrice: number;
    status: boolean;
    orderRows: IProduct[]

    constructor(user:IUser, totalPrice:number , orderRows:IProduct[]){
        
        this.id = Math.floor(Math.random() * 10000);
        this.companyId = 42;
        this.created = new Date();
        this.createdBy = user;
        this.paymentMethod = "Paypal"
        this.totalPrice = totalPrice;
        this.status = true;
        this.orderRows = orderRows
    }

}