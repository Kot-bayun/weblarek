import { IBuyer, TPayment } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { Form } from "./Form";

type TFormOrder = Pick<IBuyer, 'payment' | 'address'>;

export class Order extends Form<TFormOrder> {
    protected onlineButton: HTMLButtonElement;
    protected cashButton: HTMLButtonElement;
    protected addressElement: HTMLInputElement;
    

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container, events);
                
        this.onlineButton = ensureElement<HTMLButtonElement>('button[name="card"]', this.container);
        this.cashButton = ensureElement<HTMLButtonElement>('button[name="cash"]', this.container);
        this.addressElement = ensureElement<HTMLInputElement>('input[name="address"]', this.container);

        this.onlineButton.addEventListener('click', () => {
            this.emitChange('payment', 'card');
        });

        this.cashButton.addEventListener('click', () => {
            this.emitChange('payment', 'cash');
        });

        this.addressElement.addEventListener('input', () => {
            this.emitChange('address', this.addressElement.value);
        });
    }

    set payment(value: TPayment) {
        this.onlineButton.classList.toggle("button_alt-active", value === "card");
        this.cashButton.classList.toggle("button_alt-active", value === "cash");
    }

    set address(value: string) {
        this.addressElement.textContent = String(value);
    }

    resetOrderForm(): void {
        this.addressElement.value = '';
    }
}