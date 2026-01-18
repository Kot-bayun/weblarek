import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IModal {
    content: HTMLElement;
}

export class Modal extends Component<IModal> {
    protected closeButton: HTMLButtonElement;
    protected contentElement: HTMLElement;
    
    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
    
        this.closeButton = ensureElement<HTMLButtonElement>('.modal__close', this.container);
        this.contentElement = ensureElement<HTMLElement>('.modal__content', this.container);

        this.closeButton.addEventListener('click', () => {
            this.events.emit('modal:close');
        });

        this.container.addEventListener('click', (event: MouseEvent) => {
            if (event.target === this.container) {
                this.close(); 
            }
        });
    }
    
    set content(data: HTMLElement) {
        this.contentElement.replaceChildren(data);
    }

    open(): void {
        this.container.classList.add('modal_active');
        this.events.emit('modal:open');
    }  

    close(): void {
        this.container.classList.remove('modal_active');
        this.contentElement.replaceChildren();
        this.events.emit('modal:close');
    }
}