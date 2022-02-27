import { IProduct } from "./IProduct";
import { IUser } from "./IUser";
import { OrderRow } from "./OrderRow";

export class IOrder {
    id: number;
    companyId: number;
    created: Date;
    createdBy: IUser;
    paymentMethod: string;
    totalPrice: number;
    status: number;
    orderRows: OrderRow[]

    constructor(user:IUser, totalPrice:number , orderRows:IProduct[]){
        
        let randomOrderId = Math.floor(Math.random() * 99999);
        let randomRowId = Math.floor(Math.random() * 99999);

        let rows: OrderRow[] = []

        for (let i = 0; i < orderRows.length; i++) {
            const order = orderRows[i];
            let row = new OrderRow(randomOrderId, order.id, order, 1, randomRowId)
            
            rows.push(row)
        }

        this.id = randomOrderId;
        this.companyId = 42;
        this.created = new Date();
        this.createdBy = user;
        this.paymentMethod = "Paypal"
        this.totalPrice = totalPrice;
        this.status = 0;
        this.orderRows = rows

        
    }

}