import { IBuyer } from '../../types';

export class Buyer {
    protected data: IBuyer | null;

    constructor() {
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
    }

    getData(): IBuyer | null {
        return this.data;
    }

    cleanData(): void {
        this.data = {};
    }
    
    validateData(): Record<string, string> | undefined {
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