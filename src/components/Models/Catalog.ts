import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class Catalog {
    protected products: IProduct[];
    protected currentProduct: IProduct | null;

    constructor(protected events: IEvents) {
        this.products = [];
        this.currentProduct = null;
    }

    setItems(items: IProduct[]): void {
        this.products = items;

        this.events.emit('catalog:change');
    }

    getItems(): IProduct[] {
        return this.products;
    }

    getItemById(id: string): IProduct | undefined {
        return this.products.find(item => item.id === id);
    }

    setItem(item: IProduct): void {
       this.currentProduct = item;

       this.events.emit('item:change', this.currentProduct);
    }

    getItem(): IProduct | null {
        return this.currentProduct;
    }
}