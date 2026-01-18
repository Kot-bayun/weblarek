import { IProduct } from "../../../types";
import { categoryMap } from "../../../utils/constants";
import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { Card } from "./Card";
import { CategoryKey } from "./CardInCatalog";

type TCardCatalog = Pick<IProduct, 'image' | 'category' | 'description'>;

export class CardPreview extends Card<TCardCatalog> {
    protected imageElement: HTMLImageElement;
    protected categoryElement: HTMLElement;
    protected aboutElement: HTMLElement;
    protected buyButton: HTMLButtonElement; 

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
        
        this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);
        this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container);
        this.aboutElement = ensureElement<HTMLElement>('.card__text', this.container);
        this.buyButton = ensureElement<HTMLButtonElement>('.card__button', this.container);

        this.buyButton.addEventListener('click', () => {
            this.events.emit('preview:click');
        })
    }

    set image(value: string) {
        this.setImage(this.imageElement, value, this.title);
    }

    set category(value: string) {
        this.categoryElement.textContent = String(value);
    
        for (const key in categoryMap) {
            this.categoryElement.classList.toggle(
                categoryMap[key as CategoryKey],
                key === value
            );
        }
    }
    
    set about(value: string) {
        this.aboutElement.textContent = String(value);
    }

    set buttonText(value: string) {
        this.buyButton.textContent = value;
    }
      
    set buttonState(value: boolean) {
        this.buyButton.disabled = value;
    }
}