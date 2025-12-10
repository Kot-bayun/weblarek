import { IBuyer } from '../../types';

export class Buyer {
    protected data: IBuyer | null;

    constructor() {
        this.data = null;
    }
    
    setData(buyer: IBuyer): void {
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

    cleanData(): IBuyer | null {
        return this.data = null;
    }
    
    validateData(): {} | undefined {
        const errors = {
            payment: 'Не выбран вид оплаты',
            email: 'Укажите почту',
            phone: 'Укажите телефон',
            address: 'Укажите адрес',
        }
        
        if (!this.data?.payment) {
            return errors.payment;
        } else if (!this.data?.email) {
            return errors.email;
        } else if (!this.data?.phone) {
            return errors.phone;    
        } else if (!this.data?.address) {
            return errors.address;
        }
    }   
}