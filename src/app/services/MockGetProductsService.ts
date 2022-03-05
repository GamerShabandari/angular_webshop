import { Observable, Subject } from "rxjs";
import { ICategory } from "../models/ICategory";
import { IProductCategory } from "../models/IProductCategory";
import { IGetProductsService } from "../models/IGetProductsService";
import { IProduct } from "../models/IProduct";

export class MockGetProductsService implements IGetProductsService {
    private products = new Subject<IProduct[]>();
    public products$: Observable<IProduct[]> = this.products.asObservable();

    private categories = new Subject<ICategory[]>();
    public categories$: Observable<ICategory[]> = this.categories.asObservable();


    /////////////// två stycken testprodukter för att testa komponent ///////////

    product1: IProduct = {

        id: 1,
        name: "testproduct1",
        description: "string",
        price: 11,
        imageUrl: "string",
        year: 1900,
        added: new Date(2017, 11, 10),
        productCategory: [
            {
                categoryId: 72,
                category: null
            }
        ]

    }

    product2: IProduct = {

        id: 1,
        name: "testproduct1",
        description: "string",
        price: 11,
        imageUrl: "string",
        year: 1900,
        added: new Date(2017, 11, 10),
        productCategory: [
            {
                categoryId: 72,
                category: null
            }
        ]

    }

    private testProductsData: IProduct[] = [this.product1, this.product2]

    getProducts(): void {
        this.products.next(this.testProductsData)
    }


    ////////////////////////////////////////////////////////////////////////


    /////////////// två stycken testkategorier för att testa komponent ///////////

    category1: ICategory = {
        id:1,
        name: "testCategory1"
    }

    category2: ICategory = {
        id:2,
        name: "testCategory2"
    }



    private testCategoryData: ICategory[] = [this.category1, this.category2]
    
    getCategoriesFromApi(): void {

        this.categories.next(this.testCategoryData)

    }

}