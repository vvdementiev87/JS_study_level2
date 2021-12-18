const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';


const app = new Vue({
    el: "#app",
    data: {
        catalogUrl: 'catalogData.json',
        cartUrl: 'getBasket.json',
        products: [],
        filtered: [],
        imgProduct: 'images/img123.png',
        imgCart: 'images/img123.png',
        cartItems: [],
        userSearch: '',
        showCart: false,
        isVisibleCart: true,
        error: false
    },
    methods: {
        filter() {
            const regexp = new RegExp(this.userSearch, 'i');
            this.filtered = this.products.filter(product => {
                return (regexp.test(product.product_name) || regexp.test(product.price));
            });
        },
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    this.error = true;
                    console.log(error);
                })
        },
        addProduct(item) {
            this.getJson(`${API}addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        let find = this.cartItems.find(el => el.id_product === item.id_product);
                        if (find) {
                            find.quantity++;
                            console.log(find.qantity);
                        } else {
                            const prod = Object.assign({ quantity: 1 }, item);
                            this.cartItems.push(prod);
                            console.log(this.cartItems);
                        }
                    }
                })
        },
        remove(item) {
            this.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        if (item.quantity > 1) {
                            item.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        }
                    }
                })
        }
    },
    mounted() {
        this.getJson(`${API+this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    console.log(el);
                }
            });
        this.getJson('getProducts.json')
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
            });
        this.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for (let item of data.contents) {
                    this.cartItems.push(item);
                }
            });
        this.filtered = this.products;
    }
})