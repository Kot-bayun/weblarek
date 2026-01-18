import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";
import { IEvents } from "../../base/Events";

interface IForm {
    errors?: string;
}

export abstract class Form<T> extends Component<IForm & T> {
    protected errorElement: HTMLElement;
    protected submitButton: HTMLButtonElement;
    
    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
            
        this.errorElement = ensureElement<HTMLElement>('.form__errors', this.container);
        this.submitButton = ensureElement<HTMLButtonElement>('button[type=submit]', this.container);

        this.container.addEventListener('submit', () => {
            this.events.emit(`${(this.container as HTMLFormElement).name}:submit`);
        });
    }

    protected emitChange(field: keyof T, value: string) {
        this.events.emit('form:change', { field, value });
    }

    set errors(message: string) {
        this.errorElement.textContent = String(message);
    }

    set valid(value: boolean) {
        this.submitButton.disabled = !value;
    }
}