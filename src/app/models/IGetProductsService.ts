import { Observable } from "rxjs";
import { ICategory } from "./ICategory";
import { IProduct } from "./IProduct";
import { IOrder } from "./Order";

export interface IGetProductsService {

    products$: Observable<IProduct[]>;

    categories$: Observable<ICategory[]>;

    orders$: Observable<IOrder[]>;

    getProducts():void

    getCategoriesFromApi():void

    getOrderToAdmin():void
}