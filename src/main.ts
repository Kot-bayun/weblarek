import './scss/styles.scss';

import { Catalog } from './components/Models/Catalog';
import { Cart } from './components/Models/Cart';
import { Buyer } from './components/Models/Buyer';

import { apiProducts } from './utils/data';

import { Api } from './components/base/Api';
import { API_URL } from './utils/constants';
import { ApiForServer } from './components/Models/ApiForServer';

const firstCatalog = new Catalog();
// Проверяем методы сохранения и получения массива товаров
firstCatalog.setItems(apiProducts.items);
console.log('Массив товаров из каталога: ', firstCatalog.getItems());
// Проверяем метод получения одного товара по его id
console.log('Получение товара по id: ', firstCatalog.getItemById('854cef69-976d-4c2a-a18c-2aa45046c390'));
// Проверяем методы сохранения и получения товара для подробного отображения
firstCatalog.setItem(apiProducts.items[1]);
console.log('Товар для подробного отображения: ', firstCatalog.getItem());

const firstCart = new Cart();
// Проверяем метод получения массива товаров, которые находятся в корзине
console.log('Массив товаров из корзины: ', firstCart.getCartItems());
// Проверяем метод добавления товара в массив корзины
console.log('Добавляем товар в корзину: ', firstCart.addToCart({
            "id": "412bcf81-7e75-4e70-bdb9-d3c73c9803b7",
            "description": "Откройте эти куки, чтобы узнать, какой фреймворк вы должны изучить дальше.",
            "image": "/Soft_Flower.svg",
            "title": "Фреймворк куки судьбы",
            "category": "дополнительное",
            "price": 2500
}));
console.log('Массив товаров из корзины: ', firstCart.getCartItems());
// Проверяем метод удаления товара из массива корзины
console.log('Удаляем товар из корзины: ', firstCart.deleteFromCart({
            "id": "412bcf81-7e75-4e70-bdb9-d3c73c9803b7",
            "description": "Откройте эти куки, чтобы узнать, какой фреймворк вы должны изучить дальше.",
            "image": "/Soft_Flower.svg",
            "title": "Фреймворк куки судьбы",
            "category": "дополнительное",
            "price": 2500
}));
console.log('Массив товаров из корзины: ', firstCart.getCartItems());
// Проверяем метод очистки корзины
console.log('Добавляем товар в корзину: ', firstCart.addToCart({
            "id": "854cef69-976d-4c2a-a18c-2aa45046c390",
            "description": "Если планируете решать задачи в тренажёре, берите два.",
            "image": "/5_Dots.svg",
            "title": "+1 час в сутках",
            "category": "софт-скил",
            "price": 750
}));
console.log('Добавляем товар в корзину: ', firstCart.addToCart({
            "id": "c101ab44-ed99-4a54-990d-47aa2bb4e7d9",
            "description": "Лизните этот леденец, чтобы мгновенно запоминать и узнавать любой цветовой код CSS.",
            "image": "/Shell.svg",
            "title": "HEX-леденец",
            "category": "другое",
            "price": 1450
}));
console.log('Массив товаров из корзины: ', firstCart.getCartItems());
firstCart.cleanCart();
console.log('Массив товаров из корзины: ', firstCart.getCartItems());
// Проверяем методы получения стоимости и количества всех товаров в корзине
console.log('Добавляем товар в корзину: ', firstCart.addToCart({
            "id": "854cef69-976d-4c2a-a18c-2aa45046c390",
            "description": "Если планируете решать задачи в тренажёре, берите два.",
            "image": "/5_Dots.svg",
            "title": "+1 час в сутках",
            "category": "софт-скил",
            "price": 750
}));
console.log('Добавляем товар в корзину: ', firstCart.addToCart({
            "id": "c101ab44-ed99-4a54-990d-47aa2bb4e7d9",
            "description": "Лизните этот леденец, чтобы мгновенно запоминать и узнавать любой цветовой код CSS.",
            "image": "/Shell.svg",
            "title": "HEX-леденец",
            "category": "другое",
            "price": 1450
}));
console.log('Общая стоимость товаров из корзины: ', firstCart.getTotal());
console.log('Количество товаров в корзине: ', firstCart.getNumberOfItems());
// Проверяем метод наличия товара в корзине по его id
console.log('Наличие товара по id: ', firstCart.checkItemById('854cef69-976d-4c2a-a18c-2aa45046c390'));

const firstBuyer = new Buyer();
// Проверяем методы сохранения данных покупателя и получения всех данных покупателя
firstBuyer.setData({
    'payment': undefined,
    'email': 'ksu2602@yandex.ru',
    'phone': '+79057833675',
    'address': 'Moscow'
});
firstBuyer.setData({
            'payment': 'card',
});
console.log('Данные покупателя: ', firstBuyer.getData());
// Проверяем метод очистки данных покупателя
console.log('Данные покупателя после очистки: ', firstBuyer.cleanData());
// Проверяем метод валидации данных
firstBuyer.setData({
    'payment': 'card',
    'phone': '+79057833675',
    'address': 'Moscow'
});
console.log('Результат проверки полей: ', firstBuyer.validateData());

// Выполняем запрос на сервер, чтобы получить каталог товаров
const api = new Api(API_URL);
const firstGet = new ApiForServer(api);

firstGet.doGetRequest()
.then((items) => {
    firstCatalog.setItems(items);
    console.log('Cохраненный каталог: ', firstCatalog.getItems());
  })
  .catch((error) => {
    console.log('Ошибка при загрузке каталога: ', error);
  });