import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface ISuccess {
    sum: number;
}

export class Success extends Component<ISuccess> {
    protected descriptionElement: HTMLElement;
    protected newBuysButton: HTMLButtonElement;
        
    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
        
        this.descriptionElement = ensureElement<HTMLElement>('.order-success__description', this.container);
        this.newBuysButton = ensureElement<HTMLButtonElement>('.order-success__close', this.container);
        
        this.newBuysButton.addEventListener('click', () => {
            this.events.emit('success:click');
        });
    }
        
    set sum(value: number) {
        this.descriptionElement.textContent = `Списано ${value} синапсов`;
    }
}