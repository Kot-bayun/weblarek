import './scss/styles.scss';

import { Catalog } from './components/Models/Catalog';
import { Cart } from './components/Models/Cart';
import { Buyer } from './components/Models/Buyer';

import { Api } from './components/base/Api';
import { API_URL, CDN_URL } from './utils/constants';
import { ApiForServer } from './components/Models/ApiForServer';

import { EventEmitter } from './components/base/Events';
import { cloneTemplate, ensureElement } from './utils/utils';

import { Header } from './components/Views/Header';
import { Gallery } from './components/Views/Gallery';
import { Modal } from './components/Views/Modal';
import { Success } from './components/Views/Success';
import { Basket } from './components/Views/Basket';

import { CardInCatalog } from './components/Views/Cards/CardInCatalog';
import { CardPreview } from './components/Views/Cards/CardPreview';
import { CardInBasket } from './components/Views/Cards/CardInBasket';

import { Order } from './components/Views/Forms/Order';
import { Contacts } from './components/Views/Forms/Contacts';
import { ApiDataToServer, IBuyer, IProduct } from './types';

// Создаем экземпляры базового класса Api и слоя коммуникации
const api = new Api(API_URL);
const firstGet = new ApiForServer(api);

// Создаем экземпляр брокера событий
const events = new EventEmitter();

// Создаем экземпляры моделей данных
const firstCatalog = new Catalog(events);
const firstCart = new Cart(events);
const firstBuyer = new Buyer(events);

// Создаем экземпляры слоев представления, кроме CardInCatalog и CardInBasket (их будем находить ниже)
const header = new Header(ensureElement<HTMLElement>('.header'), events);
const gallery = new Gallery(ensureElement<HTMLElement>('.gallery'));
const modal = new Modal(ensureElement<HTMLElement>('.modal'), events);
const success = new Success(cloneTemplate(ensureElement<HTMLTemplateElement>('#success')), events);
const cardPreview = new CardPreview(cloneTemplate(ensureElement<HTMLTemplateElement>('#card-preview')), events);
const basket = new Basket(cloneTemplate(ensureElement<HTMLTemplateElement>('#basket')), events);
const orderForm = new Order(cloneTemplate(ensureElement<HTMLTemplateElement>('#order')), events);
const contactsForm = new Contacts(cloneTemplate(ensureElement<HTMLTemplateElement>('#contacts')), events);

// Получаем изменившуюся галерею товаров по подписке
events.on('catalog:change', () => {
  const itemCards = firstCatalog.getItems().map((item) => {
    const card = new CardInCatalog(cloneTemplate(ensureElement<HTMLTemplateElement>('#card-catalog')),
    { onClick: () => events.emit('item:selected', item) });
    
    return card.render({
      ...item,
      image: CDN_URL + item.image
    });
  });
  
  gallery.render({ catalog: itemCards });
})

// Подписываемся на событие, когда карточка для подробного рассмотрения кликается
events.on('preview:click', () => {
  const item = firstCatalog.getItem();

  if(!item) {
    return;
  }

  if(!firstCart.checkItemById(item.id)) {
    firstCart.addToCart(item);
  } else {
    firstCart.deleteFromCart(item);
  }

  modal.close();
})

// Подписываемся на событие, когда карточка выбралась
events.on('item:selected', (item: IProduct) => {
  firstCatalog.setItem(item);
})

// Подписываемся на событие, когда карточка изменилась
events.on('item:change', (current: IProduct) => {
  modal.render( { content: cardPreview.render({ ...current, image: CDN_URL + current.image }) });

  modal.open();

  const itemInBasket = firstCart.checkItemById(current.id);

  if(!current.price) {
    cardPreview.buttonText = 'Недоступно';
    cardPreview.buttonState = true;
  } else if(itemInBasket) {
    cardPreview.buttonText = 'Удалить из корзины';
    cardPreview.buttonState = false;
  } else {
    cardPreview.buttonText = 'Купить';
    cardPreview.buttonState = false;
  }
})

// Получаем изменившуюся корзину по подписке
events.on('basket:changed', () => {
  header.counter = firstCart.getNumberOfItems();

  const itemList = firstCart.getCartItems().map((item, index) => {
    const card = new CardInBasket(cloneTemplate(ensureElement<HTMLTemplateElement>('#card-basket')),
    { onClick: () => firstCart.deleteFromCart(item) });
    
    card.index = index + 1;

    return card.render(item);
  })

  basket.render({ itemList, sumInBasket: firstCart.getTotal()});
})

// Подписываемся на событие, когда корзина открывается
events.on('basket:open', () => {
  modal.render( {content: basket.render()} )

  modal.open();
})

// Подписываемся на событие, когда первая форма открывается
events.on('order:open', () => {
  const { payment, address } = firstBuyer.validateData();
  const buyerData = firstBuyer.getData();

  modal.render( {content: orderForm.render({ payment: buyerData?.payment, address: buyerData?.address ?? '', errors: Object.values( { payment, address } ).filter(Boolean).join(', ') }) });

  orderForm.valid = !payment && !address;
})

// Подписываемся на событие, когда форма изменилась
events.on('form:change', (data: { field: keyof IBuyer, value: string}) => {
  firstBuyer.setData({ [data.field]: data.value } as Partial<IBuyer>);
})

// Подписываемся на событие, когда покупатель изменился
events.on('buyer:changed', (data: Partial<IBuyer>) => {
  const buyerData = firstBuyer.getData();
  const { payment, address, email, phone } = firstBuyer.validateData();

  if('payment' in data || 'address' in data) {
    orderForm.render({ payment: buyerData?.payment, address: buyerData?.address ?? '', errors: Object.values( { payment, address } ).filter(Boolean).join(', ') })
    
    orderForm.valid = !payment && !address;
  }

  if('email' in data || 'phone' in data) {
    contactsForm.render({ email: buyerData?.email, phone: buyerData?.phone, errors: Object.values( { email, phone } ).filter(Boolean).join(', ') })
    
    contactsForm.valid = !email && !phone;
  }
})

// Подписываемся на событие, когда произошел сабмит первой формы
events.on('order:submit', () => {
  const { email, phone } = firstBuyer.validateData();
  const buyerData = firstBuyer.getData();

  modal.render( {content: contactsForm.render({ email: buyerData?.email ?? '', phone: buyerData?.phone ?? '', errors: '' } ) })

  contactsForm.valid = !email && !phone;
})

// Подписываемся на событие, когда произошел сабмит второй формы
events.on('contacts:submit', () => {
  const buyerData = firstBuyer.getData();

  const dataOrder: ApiDataToServer = {
    payment: buyerData?.payment!,
    email: buyerData?.email!,
    phone: buyerData?.phone!,
    address: buyerData?.address!,
    total: firstCart.getTotal(),
    items: firstCart.getCartItems().map((p) => p.id),
  };
  
  // Выполняем запрос на сервер, чтобы отправить заказ
  firstGet.doPostRequest(dataOrder)
  .then((res) => {
    modal.render({ content: success.render({
      sum: res.total
    })
  })

  firstCart.cleanCart();
  firstBuyer.cleanData();
  })
  .catch((error) => {
    console.log('Ошибка при отправке заказа:', error);
  })
})

// Подписываемся на событие, когда модальное окно закрывается
events.on('modal:close', () => {
  modal.close();
})

// Выполняем запрос на сервер, чтобы получить каталог товаров
firstGet.doGetRequest()
.then((items) => {
  firstCatalog.setItems(items.items);
  console.log('Cохраненный каталог: ', firstCatalog.getItems());
})
.catch((error) => {
  console.log('Ошибка при загрузке каталога: ', error);
});