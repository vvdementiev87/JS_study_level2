let API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';

class ProductList {
    constructor(container = '.products__list') {
        this.container = container;
        this.goods = [];
        this._fetchProducts().then(data => {
            this.goods = data;
            this.render();
        })
        this.render();
        this.totalSum();
    }
    _fetchProducts() {
        return fetch(`${API}catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });
    }
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const item = new ProductItem(product);
            block.insertAdjacentHTML('beforeend', item.render());
        }

    }
    totalSum() {
        let totalSum = 0;
        for (let item of this.goods) {
            totalSum += item.price;
        }
        return totalSum
    }
}

class ProductItem {
    constructor(product) {
        this.id = product.id_product;
        this.title = product.product_name;
        this.price = product.price;
        this.img = `img${product.id_product}.png`;
        this.render();
    }
    render() {
        return `<div class="products__item" data-id="${this.id}">
        <img class="products__img" src="images/${this.img}">
        <h3>${this.title}</h3>
        <p>$${this.price}</p>
        <button class="buy__btn">Купить</button></div>`
    }
}

class Cart {
    constructor(container = '.cart__footer') {
        this.container = container;
        this.goods = [];
        this.addGoods().then(data => {
            this.goods = data.contents;
            this.render();
        }); //добавление продукта в корзину
        this.removeGoods(); //Удаление продукта из корзины
        this.changeGoods(); //Прорисовка строк корзины
        this.render(); // подсчет и прорисовка общей стоимости продуктов в корзине
        this.cartHiddenToggle(); //отображение/скрытие списка корзины
        this.totalSum();
    }
    cartHiddenToggle() {
        document.querySelector('.cart__count').classList.toggle('cart__hidden');
    }

    addGoods() {
        return fetch(`${API}getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });
    }
    removeGoods() {}
    changeGoods() {}
    totalSum() {
        let totalSum = 0;
        for (let item of this.goods) {
            totalSum += item.price;
        }
        return totalSum
    }
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const item = new ProductInCart(product);
            block.insertAdjacentHTML('beforebegin', item.render());
        }
        document.querySelector('.cart__total').textContent = Number(this.totalSum());
    }
}

class ProductInCart {
    constructor(product) {
        this.id = product.id_product;
        this.title = product.product_name;
        this.price = product.price;
        this.img = `img${product.id_product}.png`; //массив продуктов в корзине
        this.render(); //прорисовка строки с новым продуктом, добавленным в корзину

    }
    render() {
        return `<div class="cart__row">
        <div>${this.title}</div>
        <div><span class="productCount" data-productId="${this.id}">1</span> шт.</div>
        <div>$${this.price}</div>
        <div>$<span class="productCountTotal" data-productId="${this.id}">${this.price}</span></div>
        </div>`
    }
}



let productList = new ProductList;
console.log(productList.totalSum());

let cart = new Cart;
document.querySelector('.cart__button').addEventListener('click', function() {
    cart.cartHiddenToggle();
});