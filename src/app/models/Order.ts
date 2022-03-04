import { IProduct } from "./IProduct";
import { IUser } from "./User";
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

    constructor(user:IUser, totalPrice:number , orderRows:IProduct[], payment:string){
        

        let rows: OrderRow[] = []

        for (let i = 0; i < orderRows.length; i++) {
            const order = orderRows[i];
            let row = new OrderRow(order.id, 1)
            
            rows.push(row)
        }

        this.id = Number()
        this.companyId = 42;
        this.created = (new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('.')[0]);
        this.createdBy = user.firstname + " " + user.lastname;
        this.paymentMethod = payment;
        this.totalPrice = totalPrice;
        this.status = 0;
        this.orderRows = rows   
    }

}