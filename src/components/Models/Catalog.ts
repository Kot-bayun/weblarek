import { IProduct } from "../../types";

export class Catalog {
    protected products: IProduct[];
    protected currentProduct: IProduct | null;

    constructor() {
        this.products = [];
        this.currentProduct = null;
    }

    setItems(items: IProduct[]): void {
        this.products = items;
    }

    getItems(): IProduct[] {
        return this.products;
    }

    getItemById(id: string): IProduct | undefined {
        return this.products.find(item => item.id === id);
    }

    setItem(item: IProduct): void {
       this.currentProduct = item;
    }

    getItem(): IProduct | null {
        return this.currentProduct;
    }
}