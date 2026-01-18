import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IBasket {
    itemList: HTMLElement[];
    sumInBasket: number;
}

export class Basket extends Component<IBasket> {
    protected basketElement: HTMLElement;
    protected doOrderButton: HTMLButtonElement;
    protected sumElement: HTMLElement;
        
    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
        
        this.basketElement = ensureElement<HTMLElement>('.basket__list', this.container);
        this.doOrderButton = ensureElement<HTMLButtonElement>('.basket__button', this.container);
        this.sumElement = ensureElement<HTMLElement>('.basket__price', this.container);

        this.doOrderButton.addEventListener('click', () => {
            this.events.emit('order:open');
        });

        this.itemList = [];
    }
        
    set itemList(items: HTMLElement[]) {
        this.basketElement.replaceChildren(...items);

        this.doOrderButton.disabled = !items || items.length === 0;
    }

    set sumInBasket(value: number) {
        this.sumElement.textContent = `${value} синапсов`;
    }
}