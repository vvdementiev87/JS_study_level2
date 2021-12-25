/* const linkListSection = document.getElementById('menu');
const menu = [
    { link: '#', name: 'Главная' },
    { link: '#Section_2', name: 'Продукт' },
    { link: '#', name: 'Контакты' }
];
const renderMenu = (link, name) => `<a class="menuStyle" href="${link}">${name}</a>`; //добавление класса для стилизации меню

const renderLinkList = (list) => {
    const linkList = list.map(item => renderMenu(item.link, item.name));
    document.querySelector('.menu').innerHTML = linkList.join('');
}
renderLinkList(menu); */
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        cartUrl: '/getBasket.json',
        cartItems: [],
        imgCart: 'https://placehold.it/200x150',
        userSearch: '',
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    // console.log(error)
                    this.$refs.error.text = error;
                })
        },
        postJson(url, data) {
            return fetch(url, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                .then(result => result.json())
                .catch(error => {
                    // console.log(error)
                    this.$refs.error.text = error;
                })
        },
        putJson(url, data) {
            return fetch(url, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                .then(result => result.json())
                .catch(error => {
                    // console.log(error)
                    this.$refs.error.text = error;
                })
        },
        deleteJson(url, data) {
            return fetch(url, {
                    method: 'DELETE',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                .then(result => result.json())
                .catch(error => {
                    // console.log(error)
                    this.$refs.error.text = error;
                })
        },
        cartSumm() {
            return this.cartItems.reduce((summ, item) => summ + item.quantity * item.price, 0);
        }


    }
});