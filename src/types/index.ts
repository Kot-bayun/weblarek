export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
  get<T extends object>(uri: string): Promise<T>;
  post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

// Псевдоним типа для способа оплаты
export type TPayment = 'card' | 'cash' | undefined;

// Интерфейс для товара
export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

// Интерфейс для данных покупателя
export interface IBuyer {
  payment?: TPayment;
  email?: string;
  phone?: string;
  address?: string;
}

// Тип для объекта, который приложение отправляет на сервер при оформлении заказа
export interface ApiDataToServer extends IBuyer {
  total: number;
  items: string[];
}