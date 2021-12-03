class ProductList {
    constructor(container = '.products__list') {
        this.container = container;
        this.goods = [];
        this._fetchProducts();
        this.render();
        this.totalSum();
    }
    _fetchProducts() {
        this.goods = [
            { id: 1, title: 'Shirt', price: 150, img: 'img1.png' },
            { id: 2, title: 'Socks', price: 50, img: 'img2.png' },
            { id: 3, title: 'Jacket', price: 350, img: 'img3.png' },
            { id: 4, title: 'Shoes', price: 250, img: 'img4.png' }
        ];
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
        this.id = product.id;
        this.title = product.title;
        this.price = product.price;
        this.img = product.img;
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
    constructor(container = '.cart__count') {
        this.container = container;
        this.addProduct(); //добавление продукта в корзину
        this.deleteProduct(); //Удаление продукта из корзины
        this.drawCart(); //Прорисовка строк корзины
        this.totalSumCount();// подсчет и прорисовка общей стоимости продуктов в корзине
        this.cartHiddenToggle();//отображение/скрытие списка корзины
    }
    cartHiddenToggle() {
        document.querySelector(this.container).classList.toggle('cart__hidden');
    }

    addProduct() {}
    deleteProduct() {}
    drawCart() {}
    totalSumCount() {}
}

class ProductInCart {
    constructor() {
        this.productInCart = []; //массив продуктов в корзине
        this.drawNewCartRow(); //прорисовка строки с новым продуктом, добавленным в корзину
        this.updateCartRow(); // обнавление количества продуктов одного типа в корзине
    }
    drawNewCartRow() {}
    updateCartRow() {}
}

let productList = new ProductList;
console.log(productList.totalSum());

let cart = new Cart;
document.querySelector('.cart__button').addEventListener('click', function() {
    cart.cartHiddenToggle();
});