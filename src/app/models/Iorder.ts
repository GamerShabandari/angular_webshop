import { IProduct } from "./IProduct";

export class IOrder {
    id: number;
    companyId: number;
    created: Date;
    createdBy: string;
    paymentMethod: string;
    totalPrice: number;
    status: boolean;
    orderRows: IProduct[]

    constructor(totalPrice:number , orderRows:IProduct[]){
        //this.id = id;
        this.id = Math.floor(Math.random() * 10000);
        this.companyId = 42;
        this.created = new Date();
        this.createdBy = "Paolo Maldini";
        this.paymentMethod = "Paypal"
        this.totalPrice = totalPrice;
        this.status = true;
        this.orderRows = orderRows
    }

}