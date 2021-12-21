/* const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'; */

Vue.component('cart', {
    data() {
        return {
            cartUrl: '/getBasket.json',
            cartItems: [],
            imgCart: 'https://placehold.it/200x150',
            showCart: false
        }
    },
    mounted() {
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let item of data.contents) {
                    item.imgPath = `img/${item.id_product}.png`;
                    this.$data.cartItems.push(item);
                }
            });
    },
    methods: {
        addProduct(item) {
            console.log(item);
            let find = this.cartItems.find(el => el.id_product === item.id_product);
            if (find) {
                this.$parent.putJson(`/api/cart/${find.id_product}`, { quantity: 1 })
                    .then(data => {
                        if (data.result === 1) {
                            find.quantity++;
                        }
                    })
            } else {
                const prod = Object.assign({ quantity: 1 }, item);
                item.imgPath = `img/${item.id_product}.png`;
                this.$parent.postJson(`/api/cart`, prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.push(prod)
                        }
                    })
            }

            /* this.$parent.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        let find = this.cartItems.find(el => el.id_product === item.id_product);
                        if (find) {
                            find.quantity++;
                        } else {
                            const prod = Object.assign({ quantity: 1 }, item);
                            this.cartItems.push(prod)
                        }
                    }
                }) */
        },
        remove(item) {
            /* console.log(item); */
            let find = this.cartItems.find(el => el.id_product === item.id_product);
            if (find.quantity > 0) {
                this.$parent.putJson(`/api/cart/${find.id_product}`, { quantity: -1 })
                    .then(data => {
                        if (data.result === 1) {
                            find.quantity--;
                        }
                    })
            }
        },
        cartCount() {
            return this.cartItems.reduce((summ, item) => summ + item.quantity, 0);
        },
        cartSumm() {
            return this.cartItems.reduce((summ, item) => summ + item.quantity * item.price, 0);
        }
    },
    template: `
    <div>
    <div class="header__cart">
                        <a href="#" @click="showCart = !showCart" class="header__item header__item--cart">
                            <img src="img/cart.svg" alt="cart">
                        </a>
                        <div class="header__count">{{ cartCount() }}</div>
                    </div>
        <div v-if=" cartItems.length === 0" class="header__cart__block" v-show="showCart">
        <h2>Корзина пуста</h2>
        </div>           
        <div v-else >           
            <div class="header__cart__block" v-show="showCart">      
                <h3>{{ this.cartItems.reduce((summ, item) => summ + item.quantity, 0) }} товара(ров)</h3>
                <h3>ИТОГО: {{ this.cartItems.reduce((summ, item) => summ + item.quantity*item.price, 0) }} рублей </h3>
                <cart-item v-for="item of cartItems" :key="item.id_product" :img="item.imgPath" :cart-item="item" :cart-count = "cartCount"
                :cart-summ = "cartSumm" @remove="remove()"
                </cart-item>
            </div>  
        </div>
    </div>
    `
});

Vue.component('cart-item', {
    props: ['img', 'cartItem'],
    template: `
    <div class="header__cart__item">
        <img class="header__cart__img" :src="img" alt="Some img">
        <div>
            <h3>{{ cartItem.product_name }}</h3>
            <p>Цена : {{ cartItem.price }}</p>             
        </div>
        <div>            
            <div class="header__cart__change">
                <p>&#160;{{ cartItem.quantity }}&#160; шт.&#160; </p>
                <button class="header__btn" @click="$parent.remove(cartItem)"> &times; </button>
            </div>           
        </div>
        <div>
        <p>Сумма:</p> 
        <p>{{ cartItem.price * cartItem.quantity }}</p>
        </div> 
    </div>
    `
})