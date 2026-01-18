import { IProduct } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { Card } from "./Card";
import { ICardActions } from "./CardInCatalog";

type TCardCatalog = Pick<IProduct, 'id'>;

export class CardInBasket extends Card<TCardCatalog> {
    indexElement: HTMLElement;
    deleteButton: HTMLButtonElement;

    constructor(container: HTMLElement, actions?: ICardActions) {
        super(container);
        
        this.indexElement = ensureElement<HTMLImageElement>('.basket__item-index', this.container);
        this.deleteButton = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container);

        if (actions?.onClick) {
            this.deleteButton.addEventListener('click', actions.onClick)
        }
    }

    set index(value: number) {
        this.indexElement.textContent = String(value);
    }
}