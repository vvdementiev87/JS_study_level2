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
        return `<div class="products__item">
        <img class="products__img" src="images/${this.img}">
        <h3>${this.title}</h3>
        <p>$${this.price}</p>
        <button class="buy__btn" data-id="${this.id}">Купить</button></div>`
    }
}

class Cart {
    constructor(container = '.cart__main') {
        this.container = container;
        this.goods = [];
        this.addGoods().then(data => {
            this.goods = data.contents;
            this.render();
            this.removeGoods();
            this.changeGoods();
            console.log(productList.totalSum());
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
    removeGoods() {
        document.querySelectorAll('.delete__btn').forEach(element => {
            element.addEventListener('click', element => {
                let idTarget = Number(element.target.dataset.id);
                let id = this.goods.findIndex(good => {
                    return good.id_product == idTarget;
                });
                if (this.goods[id].quantity === 1) {
                    this.goods.splice(id, 1);
                } else {
                    this.goods[id].quantity--;
                }
                this.render();
                this.removeGoods();
            })
        })
    }
    changeGoods() {
        document.querySelectorAll('.buy__btn').forEach(element => {
            console.log(element);
            element.addEventListener('click', element => {
                let idTarget = Number(element.target.dataset.id);
                let id = this.goods.findIndex(good => {
                    return good.id_product == idTarget;
                });
                if (id == -1) {
                    this.goods.push(productList.goods.find(item => item.id_product == idTarget));
                    this.goods[this.goods.length - 1].quantity = 1;
                } else {
                    this.goods[id].quantity++;

                }
                this.render();
                this.removeGoods();
            })
        })
    }
    totalSum() {
        let totalSum = 0;
        for (let item of this.goods) {
            totalSum += item.price * item.quantity;
        }
        return totalSum
    }
    render() {
        const block = document.querySelector(this.container);
        block.textContent = '';
        for (let product of this.goods) {
            const item = new ProductInCart(product);
            block.insertAdjacentHTML('afterbegin', item.render());
        }
        document.querySelector('.cart__total').textContent = Number(this.totalSum());
    }
}

class ProductInCart {
    constructor(product) {
        this.id = product.id_product;
        this.title = product.product_name;
        this.price = product.price;
        this.quantity = product.quantity;
        this.img = `img${product.id_product}.png`; //массив продуктов в корзине
        this.render();
        //прорисовка строки с новым продуктом, добавленным в корзину

    }
    render() {
        return `<div class="cart__row">
        <div class="cart__row--element">${this.title}</div>
        <div class="cart__row--element"><span class="productCount" data-productId="${this.id}">${this.quantity}</span> шт.</div>
        <div class="cart__row--element">$${this.price}</div>
        <div class="cart__row--element">$<span class="productCountTotal" data-productId="${this.id}">${(this.price*this.quantity)}</span></div>
        <div class="cart__row--element"><button class="delete__btn" data-id="${this.id}">&#x2715</button></div>
        </div>`
    }
}



let productList = new ProductList;

let cart = new Cart;
document.querySelector('.cart__button').addEventListener('click', function() {
    cart.cartHiddenToggle();
});