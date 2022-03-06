import { Observable, Subject } from "rxjs";
import { ICategory } from "../models/ICategory";
import { IProductCategory } from "../models/IProductCategory";
import { IGetProductsService } from "../models/IGetProductsService";
import { IProduct } from "../models/IProduct";
import { IOrder } from "../models/Order";

export class MockGetProductsService implements IGetProductsService {
    private products = new Subject<IProduct[]>();
    public products$: Observable<IProduct[]> = this.products.asObservable();

    private categories = new Subject<ICategory[]>();
    public categories$: Observable<ICategory[]> = this.categories.asObservable();

    private orders = new Subject<IOrder[]>();
    public orders$: Observable<IOrder[]> = this.orders.asObservable();


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

    ////////////////////////////////////////////////////////////////////////


    /////////////// två stycken testordrar för att testa komponent ///////////

    order1: IOrder = {
        id: 8314,
        companyId: 0,
        created: "0001-01-01T00:00:00",
        createdBy: "test1",
        paymentMethod: "Paypal",
        totalPrice: 0,
        status: 0,
        orderRows: [
        {
        id: 9836,
        productId: 76,
        product: "test1",
        amount: 1,
        orderId: 8314
        },
        {
        id: 9837,
        productId: 77,
        product: "test11",
        amount: 2,
        orderId: 8314
        }
        ]
    }
    order2: IOrder = {
        id: 8314,
        companyId: 0,
        created: "0001-01-01T00:00:00",
        createdBy: "test2",
        paymentMethod: "Paypal",
        totalPrice: 0,
        status: 0,
        orderRows: [
        {
        id: 9836,
        productId: 76,
        product: "test2",
        amount: 1,
        orderId: 8314
        }
        ]
    }
        order3: IOrder = {
        id: 8314,
        companyId: 0,
        created: "0001-01-01T00:00:00",
        createdBy: "test3",
        paymentMethod: "Paypal",
        totalPrice: 0,
        status: 0,
        orderRows: [
        {
        id: 9836,
        productId: 76,
        product: "test3",
        amount: 1,
        orderId: 8314
        },
        {
        id: 9837,
        productId: 77,
        product: "test33",
        amount: 2,
        orderId: 8314
        }
        ]
    }

    private testOrderData: IOrder[] = [this.order1, this.order2, this.order3]

    getOrderToAdmin():void {

        this.orders.next(this.testOrderData)

    }

}