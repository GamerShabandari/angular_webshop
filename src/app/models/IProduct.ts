import { ICategory } from "./ICategory";
import { IProductCategory } from "./IProductCategory";

export interface IProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    year: number;
    added: Date;
    productCategory: IProductCategory[]
}