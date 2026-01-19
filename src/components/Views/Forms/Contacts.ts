import { IBuyer } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { Form } from "./Form";

type TFormOrder = Pick<IBuyer, 'email' | 'phone'>;

export class Contacts extends Form<TFormOrder> {
    protected emailElement: HTMLInputElement;
    protected phoneElement: HTMLInputElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container, events);
                
        this.emailElement = ensureElement<HTMLInputElement>('input[name="email"]', this.container);
        this.phoneElement = ensureElement<HTMLInputElement>('input[name="phone"]', this.container);

         this.emailElement.addEventListener('input', () => {
            this.emitChange('email', this.emailElement.value);
        });

        this.phoneElement.addEventListener('input', () => {
            this.emitChange('phone', this.phoneElement.value);
        });
    }

    set email(value: string) {
        this.emailElement.textContent = String(value);
    }

    set phone(value: string) {
        this.emailElement.textContent = String(value);
    }

    resetContactsForm(): void {
        this.emailElement.value = '';
        this.phoneElement.value = '';
    }
}
