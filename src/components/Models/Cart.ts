import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class Cart {
   protected myProducts: IProduct[];
   
   constructor(protected events: IEvents) {
        this.myProducts = [];
    }

    getCartItems(): IProduct[] {
        return this.myProducts;
    }

    addToCart(item: IProduct): void {
        this.myProducts.push(item);

        this.events.emit('basket:changed');
    }

    deleteFromCart(item: IProduct): void {
        this.myProducts = this.myProducts.filter(product => product.id !== item.id);

        this.events.emit('basket:changed');
    }

    cleanCart(): void {
        this.myProducts = [];

        this.events.emit('basket:changed');
    }

    getTotal(): number {
        return this.myProducts.reduce((accumulator, currentValue) => accumulator + (currentValue.price || 0), 0);  
    }

    getNumberOfItems(): number {
        return this.myProducts.length;
    }
    
    checkItemById(id: string): boolean | undefined {
        return this.myProducts.some(item => item.id === id);
    }
}