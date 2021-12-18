Vue.component('products', {
    props: ['products', 'img'],
    template: `<div class="products__list container">
    <product v-for="item of products"
    :key="item.id_product"
    :img="img"
    :product="item"></product>
    </div>`
});
Vue.component('product', {
    props: ['product', 'img'],
    template: `<div class="products__item" :key="product.id_product">
    <img class="products__img" :src="img" alt="Some img">    
    <h3>{{ product.product_name }}</h3>
    <p>{{ product.price }}</p>
    <button class="buy__btn" @click="$parent.$emit('add-product', product)">Купить</button>
    </div>`
});
Vue.component('error-component', {
    props: ['error'],
    template: `<div v-if="error">
     <h1>Соединение с сервером отсуствует</h1>    
    </div>`
});