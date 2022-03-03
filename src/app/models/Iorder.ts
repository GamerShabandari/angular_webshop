import { IProduct } from "./IProduct";
import { IUser } from "./IUser";
import { OrderRow } from "./OrderRow";

export class IOrder {
    id: number;
    companyId: number;
    created: string;
    createdBy: string;
    paymentMethod: string;
    totalPrice: number;
    status: number;
    orderRows: OrderRow[]

    constructor(user:IUser, totalPrice:number , orderRows:IProduct[]){
        

        let rows: OrderRow[] = []

        for (let i = 0; i < orderRows.length; i++) {
            const order = orderRows[i];
            let row = new OrderRow(order.id, order, 1)
            
            rows.push(row)
        }

        this.id = Number()
        this.companyId = 42;
        this.created = (new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('.')[0]);
        this.createdBy = "Name:" + user.firstname + "Adress:" + user.street;
        this.paymentMethod = "Paypal"
        this.totalPrice = totalPrice;
        this.status = 0;
        this.orderRows = rows   
    }

}