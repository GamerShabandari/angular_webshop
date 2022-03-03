import { IOrder } from "./Iorder";
import { IProduct } from "./IProduct";

export class OrderRow {
    id:number;
    productId: number;
    //product: IProduct;
    product:string;
    amount: number;
    orderId:number

    constructor(productId:number, product:IProduct, amount:number){

        this.id = Number()
        this.productId = productId;
        //this.product = product;
        this.product = "";
        this.amount = amount;
        this.orderId = Number()

    }

}