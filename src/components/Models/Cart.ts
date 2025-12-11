import { IProduct } from "../../types";

export class Cart {
   protected myProducts: IProduct[];
   
   constructor() {
        this.myProducts = [];
    }

    getCartItems(): IProduct[] {
        return this.myProducts;
    }

    addToCart(item: IProduct): void {
        this.myProducts.push(item);
    }

    deleteFromCart(item: IProduct): void {
        this.myProducts = this.myProducts.filter(product => product.id !== item.id);
    }

    cleanCart(): void {
        this.myProducts = [];
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