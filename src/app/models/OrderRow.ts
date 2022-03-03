import { IProduct } from "./IProduct";

export class OrderRow {
    id:number;
    productId: number;
    product:string;
    amount: number;
    orderId:number

    constructor(productId:number, amount:number){

        
        this.id = Number()
        this.productId = productId;
        this.product = "";
        this.amount = amount;
        this.orderId = Number()

    }

}