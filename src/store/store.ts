import { action, makeAutoObservable, reaction, observable } from "mobx";
import axios from 'axios';

interface ICategories {
  id: number;
  name: string;
  parent_id: number;
}

interface IProductImg {
  id: number;
  name: string;
  image_name: string;
  product_id: number;
  image_url: string;
}
interface IProducPrice {
  id: number;
  price: number;
  stock: number;
  product_id: number;
}
interface IProductsCategory {
  id: number;
  name: string;
  category_id: number;
  description: string;
}

export interface ICartItem {
  productId: number;
  quantity: number;
  price: number;
  name: string;
  image?: string
}

export interface IHistory {
  time: string;
  status: boolean;
  address: string;
  items: ICartItem[]; // Поля productId, quantity, price, name находятся внутри items
  number: number; // Измените тип на number, если number в объекте является числом
  total: string; // Или измените тип на number, если total в объекте является числом
}

class CategoryStore {
  categories: ICategories[] = [];
  productsCategory: IProductsCategory[] = [];
  productImages: { [key: number]: string } = {};
  priceProduct: { [key: number]: number } = {};
  hasMore: boolean = true;
  index: number = 0;
  currentCategoryId: number | string = '';
 productOne: [IProductsCategory, IProductImg, IProducPrice] | [] = [];



  shoppingCart: ICartItem[] = observable.array([]);
  history:IHistory[] = observable.array([])
 constructor() {
    makeAutoObservable(this);

    this.loadCartFromLocalStorage();

    reaction(() => this.categories.length, length => console.log('Категорий:', length));
    reaction(() => this.shoppingCart.length, length => console.log('Товаров в корзине:', length));
   reaction(() => this.history.length, length => console.log('История заказов', length));
    
    reaction(
      () => this.shoppingCart.length,
      () => this.saveCartToLocalStorage()
    );
  }

  
  getCategories = action(async () => {
    try {
      const res = await axios.get('https://test2.sionic.ru/api/Categories');
      this.categories = res.data;
    } catch (error) {
      console.error('Ошибка получения категорий', error);
    }
  });


  getProductsCategories = action(async (categoryId: number | string, index: number = 0) => {
    try {
      this.currentCategoryId = categoryId;
      this.index = index; 
      this.hasMore = true; 

      const rangeStart = index * 10;
      const rangeEnd = rangeStart + 9;

      const rangeString = JSON.stringify([rangeStart, rangeEnd]);

      let url = `https://test2.sionic.ru/api/Products?range=${rangeString}`;
      if (typeof categoryId === 'number') {
        url += `&filter={"category_id":${categoryId}}`;
      }

      const res = await axios.get(url);
      const newProducts = res.data;

      if (index === 0) {
        this.productsCategory = newProducts;
      } else {
        this.productsCategory = [...this.productsCategory, ...newProducts];
      }

      if (newProducts.length < 10) {
        this.hasMore = false;
      }

      await this.loadProductImages();
      await this.getPriceProduct();
    } catch (error) {
      console.error('error', error);
    }
  });

  loadProductImages = action(async () => {
    try {
      for (const product of this.productsCategory) {
        const res = await axios.get(`https://test2.sionic.ru/api/ProductImages?filter={"product_id":${product.id}}`);
        if (res.data.length > 0) {
          this.productImages[product.id] = res.data[0].image_url;
        }
      }
    } catch (error) {
      console.error('error', error);
    }
  });

  getPriceProduct = action(async () => {
    try {
      for (const product of this.productsCategory) {
        const res = await axios.get(`https://test2.sionic.ru/api/ProductVariations?filter={"product_id":${product.id}}`);
        if (res.data.length > 0 && res.data[0].price) {
          this.priceProduct[product.id] = res.data[0].price;
        } else {
          this.priceProduct[product.id] = 0;
        }
      }
    } catch (error) {
      console.error('error', error);
    }
  });

  getMoreProduct = action(async () => {
    if (!this.hasMore) return;

    this.index += 1;
    await this.getProductsCategories(this.currentCategoryId, this.index);
  });

  getOneProduct = action(async (productID: number) => {
    try {
      const resValue= await axios.get(`https://test2.sionic.ru/api/Products?filter={"id":${productID}}`);
      const resImg = await axios.get(`https://test2.sionic.ru/api/ProductImages?filter={"product_id":${productID}}`);
      const resPrice = await axios.get(`https://test2.sionic.ru/api/ProductVariations?filter={"product_id":${productID}}`);
      this.productOne = [resValue.data[0], resImg.data[0], resPrice.data[0]];
    } catch (error) {
      console.error('error', error);
    }
  });
 addToCart = action((item: ICartItem) => {
    const existingItem = this.shoppingCart.find(cartItem => cartItem.productId === item.productId);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this.shoppingCart.push(item);
    }
 });
  addToHistory = action((item: IHistory) => {
      this.history.push(item);
  });


  removeFromCart = action((productId: number) => {
    const newCart = this.shoppingCart.filter(item => item.productId !== productId)
    this.shoppingCart = newCart
  });

  
  updateCartQuantity = action((productId: number, quantity: number) => {
    const existingItem = this.shoppingCart.find(item => item.productId === productId);
    if (existingItem) {
      existingItem.quantity = quantity;
    }
  });


  clearCart = action(() => {
    const newCart =  this.shoppingCart.filter(item => item.name === '')
    this.shoppingCart = newCart
  });
saveCartToLocalStorage = () => {
  localStorage.setItem('shoppingCart', JSON.stringify(this.shoppingCart));
    localStorage.setItem('historyOrder', JSON.stringify(this.history));

  };


  loadCartFromLocalStorage = () => {
    const cartData = localStorage.getItem('shoppingCart');
    if (cartData) {
      this.shoppingCart = JSON.parse(cartData)
    }
  };
  get calculateTotal() {
    return this.shoppingCart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };
  handleIncrease = (productId:number) => {
    const item = this.shoppingCart.find((item) => item.productId === productId);
    if (item) {
      this.updateCartQuantity(productId, item.quantity + 1);
    }
  };

  handleDecrease = (productId:number) => {
    const item = this.shoppingCart.find((item) => item.productId === productId);
    if (item && item.quantity > 1) {
      this.updateCartQuantity(productId, item.quantity - 1);
    }
  };
  loadHistoryFromLocalStorage = action(async() => {
    try {
      const data = await localStorage.getItem('historyOrder');
      if (data) {
      this.history = JSON.parse(data)
    }
    } catch (error) {
      console.log('error', error);
    }
  })


}


  


export default new CategoryStore();
