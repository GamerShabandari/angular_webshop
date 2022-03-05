import { Observable } from "rxjs";
import { ICategory } from "./ICategory";
import { IProduct } from "./IProduct";

export interface IGetProductsService {

    products$: Observable<IProduct[]>;

    categories$: Observable<ICategory[]>;

    getProducts():void

    getCategoriesFromApi():void
}