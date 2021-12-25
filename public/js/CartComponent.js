/* const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'; */

Vue.component('cart', {
    data() {
        return {
            showCart: false
        }
    },
    mounted() {
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let item of data.contents) {
                    item.imgPath = `img/${item.id_product}.png`;
                    this.$parent.$data.cartItems.push(item);
                }
            });
    },
    methods: {
        addProduct(item) {
            let find = this.$parent.cartItems.find(el => el.id_product === item.id_product);
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
                            this.$parent.cartItems.push(prod)
                        }
                    })
            }
        },
        remove(item) {
            /* console.log(item); */
            let find = this.$parent.cartItems.find(el => el.id_product === item.id_product);
            if (find.quantity > 1) {
                this.$parent.putJson(`/api/cart/${find.id_product}`, { quantity: -1 })
                    .then(data => {
                        if (data.result === 1) {
                            find.quantity--;
                        }
                    })
            } else {
                this.$parent.deleteJson(`/api/cart/${find.id_product}`, find)
                    .then(data => {
                        if (data.result === 1) {
                            this.$parent.cartItems.splice(+this.$parent.cartItems.indexOf(find), 1)
                        }
                    })
            }
        },
        cartCount() {
            return this.$parent.cartItems.reduce((summ, item) => summ + item.quantity, 0);
        },
        cartSumm() {
            return this.$parent.cartItems.reduce((summ, item) => summ + item.quantity * item.price, 0);
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
        <div v-if=" this.$parent.cartItems.length === 0" class="header__cart__block" v-show="showCart">
        <h2>Корзина пуста</h2>
        </div>           
        <div v-else >           
            <div class="header__cart__block" v-show="showCart">      
                <h3>{{ this.$parent.cartItems.reduce((summ, item) => summ + item.quantity, 0) }} товара(ров)</h3>
                <h3>ИТОГО: {{ this.$parent.cartItems.reduce((summ, item) => summ + item.quantity*item.price, 0) }} $ </h3>
                <a href="cart.html">Перейти в корзину</a>
                <cart-item v-for="item of this.$parent.cartItems" :key="item.id_product" :img="item.imgPath" :cart-item="item" :cart-count = "cartCount"
                :cart-summ = "cartSumm" @remove="remove()">
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
                <button class="header__btn" @click="$parent.remove(cartItem)"> &times; </button>
                <p> {{ cartItem.quantity }} шт.</p>                
            </div>           
        </div>
        <div>
        <p>Сумма:</p> 
        <p>{{ cartItem.price * cartItem.quantity }}</p>
        </div> 
    </div>
    `
});

Vue.component('cart-page', {
    methods: {
        remove(item) {
            /* console.log(item); */
            let find = this.$parent.cartItems.find(el => el.id_product === item.id_product);
            this.$parent.deleteJson(`/api/cart/${find.id_product}`, find)
                .then(data => {
                    if (data.result === 1) {
                        this.$parent.cartItems.splice(+this.$parent.cartItems.indexOf(find), 1)
                    }
                })

        },
    },
    template: `    
    <div class="cart__left">
                <cart-page-item v-for="item of this.$parent.cartItems" :key="item.id_product" :img="item.imgPath" :cart-page-item="item" 
                 @remove="remove()">
                </cart-page-item>
           
    </div>
    `
});
Vue.component('cart-page-item', {
    props: ['img', 'cartPageItem'],
    template: `
    <div class="cart__item">
                    <img class="cart__img cart__img--size" :src="img" alt="product img">
                    <div class="cart__text">
                        <h2>{{ cartPageItem.product_name }}</h2>
                        <p>Price: <span>$ {{ cartPageItem.price }}</span></p>
                        <p>Color: Red</p>
                        <p>Size: Xl</p>
                        <p>Quantity: {{ cartPageItem.quantity }}</p>
                    </div>
                    <button class="cart__img cart__img--close"  @click="$parent.remove(cartPageItem)"> &times; </button>
                    
    </div>    
    `
});