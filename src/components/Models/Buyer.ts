import { IBuyer } from '../../types';
import { IEvents } from '../base/Events';

export class Buyer {
    protected data: IBuyer | null;

    constructor(protected events: IEvents) {
        this.data = {};
    }
    
    setData(buyer: Partial<IBuyer>): void {
        if(!this.data) {
            this.data = {
                payment: undefined,
                email: '',
                phone: '',
                address: '',
            }
        }
    
        Object.assign(this.data, buyer)

        this.events.emit('buyer:changed', buyer);
    }

    getData(): IBuyer | null {
        return this.data;
    }

    cleanData(): void {
        this.data = {};

        this.events.emit('buyer:changed', this.data);
    }
    
    validateData(): Record<string, string> {
        const errors:Record<string, string> = {};
        
        if (!this.data?.payment) {
            errors.payment = 'Не выбран вид оплаты';
        } else if (!this.data?.email) {
            errors.email = 'Укажите почту';
        } else if (!this.data?.phone) {
            errors.phone = 'Укажите телефон';
        } else if (!this.data?.address) {
            errors.address = 'Укажите адрес';
        }
        
        return errors;
    }   
}