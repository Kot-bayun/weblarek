import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";

interface ICard {
    title: string;
    price: number | null;
}

export abstract class Card<T> extends Component<ICard & T> {
    protected nameElement: HTMLElement;
    protected priceElement: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);
            
        this.nameElement = ensureElement<HTMLElement>('.card__title', this.container);
        this.priceElement = ensureElement<HTMLElement>('.card__price', this.container);
    }

    set title(value: string) {
        this.nameElement.textContent = String(value);
    }

    set price(value: number | null) {
        if (value === null) {
            this.priceElement.textContent = 'Бесценно';
        } else {
            this.priceElement.textContent = `${value} синапсов`;
        };
    }
}