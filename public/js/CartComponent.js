// const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

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
            let find = this.cartItems.find(el => el.id_product === item.id_product);
            if (find) {
                this.$parent.putJson(`/api/cart/${find.id_product}`, { quantity: 1 })
                    .then(data => {
                        if (data.result === 1) {
                            find.quantity++
                        }
                    })
            } else {
                const prod = Object.assign({ quantity: 1 }, item);
                item.imgPath = `img/${item.id_product}.jpg`;
                this.$parent.postJson(`/api/cart`, prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.push(prod)
                        }
                    })
            }

            // this.$parent.getJson(`${API}/addToBasket.json`)
            //     .then(data => {
            //         if(data.result === 1){
            //             let find = this.cartItems.find(el => el.id_product === item.id_product);
            //             if(find){
            //                 find.quantity++;
            //             } else {
            //                 const prod = Object.assign({quantity: 1}, item);
            //                 this.cartItems.push(prod)
            //             }
            //         }
            //     })
        },
        remove(item) {
            this.$parent.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        if (item.quantity > 1) {
                            item.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        }
                    }
                })
        },
        // cartCount() {
        //     return this.cartItems.reduce((summ, item) => summ + item.quantity, 0);
        //   },
        //   cartSumm() {
        //     return this.cartItems.reduce((summ, item) => summ + item.quantity*item.price, 0);
        //   }
    },
    template: `
    <div>
    <button class="btn-cart" type="button" @click="showCart = !showCart">Корзина</button>
    <h2 v-if=" cartItems.length === 0">Корзина пуста</h2>
        <div v-else >
           
            <div class="cart-block" v-show="showCart">      
                <h3 > {{ this.cartItems.reduce((summ, item) => summ + item.quantity, 0) }} товара(ров) ИТОГО:{{ this.cartItems.reduce((summ, item) => summ + item.quantity*item.price, 0) }}) рублей </h2>
                <cart-item v-for="item of cartItems" :key="item.id_product" :img="item.imgPath" :cart-item="item" :cart-count = "cartCount"
                :cart-summ = "cartSumm" @remove="remove" @add-product="addProduct">
                </cart-item>
            </div>  
        </div>
    </div>
    `
});

Vue.component('cart-item', {
    props: ['img', 'cartItem'],
    template: `
    <div class="cart-item">
        <img class="cartImg" :src="img" alt="Some img">
        <div class="product-desc">
            <h3>{{ cartItem.product_name }}</h3>
            <p>Цена: {{ cartItem.price }}</p>
            <div class="changeQuantity">
                <button class="del-btn btnInCart" @click="$emit('remove', cartItem)"> &times; </button>
                <p>&#160;{{ cartItem.quantity }}&#160; шт.&#160; </p>
                <button class="btnInCart" @click="$emit('add-product', cartItem)"> + </button>
            </div>          
            <p>Сумма: {{ cartItem.price * cartItem.quantity }}</p>
        </div>
    </div>
    `
})