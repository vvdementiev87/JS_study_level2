const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';


const app = new Vue({
    el: "#app",
    data: {
        catalogUrl: 'catalogData.json',
        products: [],
        filtered: [],
        imageCatalog: 'images/img123.png',
        userSearch: '',
        show: false,
        isVisibleCart: true,
        productsInCart: [],
        cartEmpty: true,
    },
    methods: {
        filter(value) {
            const regexp = new RegExp(this.userSearch, 'i');
            this.filtered = this.products.filter(product => {
                return (regexp.test(product.product_name) || regexp.test(product.price));
            });
        },
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        addProduct(product) {
            console.log(product.id_product);
        }

    },
    mounted() {
        this.getJson(`${API+this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);

                }
            });
        this.getJson('getProducts.json')
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
            })
        this.filtered = this.products;
    }
})