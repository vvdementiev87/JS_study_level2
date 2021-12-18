Vue.component('cart', {
    props: ['cartItems', 'img', 'visibility'],
    template: `<div class="cart__count" v-show="visibility">
    <cart-item v-for="item of cartItems" :key="item.id_product" :img="img" :cart-item="item">
    </cart-item>
    </div>`
});
Vue.component('cart-item', {
    props: ['cartItem', 'img'],
    template: `<div class="cart-item">
    <div class="cart__item">
    <img class="cart__img" :src="img" alt="Some img">
    <div class="product-desc">
    <div class="product-title">{{ cartItem.product_name }}</div>
    <div class="product-quantity">Quantity: {{ cartItem.quantity }}</div>
    <div class="product-single-price">$ {{ cartItem.price}} each</div>
    </div>
    <div class="right-block">
    <div class="product-price">{{ cartItem.quantity*cartItem.price }}</div>
    <button class="del-btn" @click="$root.remove(cartItem)">&times;</button>
    </div>
    </div>`
});
Vue.component('filter-product', {
    template: `<form action="#" class="header__search__form">
    <input type="text" v-model="$root.userSearch" class="header__search__field">
    <button class="header__search__btn" type="submit" @click="$root.filter()">
    <svg class="header__search__img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
</svg>
    </button>
</form>`
});