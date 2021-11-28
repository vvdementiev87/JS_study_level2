const goods = [
    { id: 1, title: 'Shirt', price: 150 },
    { id: 2, title: 'Socks', price: 50 },
    { id: 3, title: 'Jacket', price: 350 },
    { id: 4, title: 'Shoes', price: 250 },
    { id: 1, title: 'Shirt', price: 150 },
    { id: 2, title: 'Socks', price: 50 },
    { id: 3, title: 'Jacket', price: 350 },
    { id: 4, title: 'Shoes', price: 250 },
    { id: 1, title: 'Shirt', price: 150 },
    { id: 2, title: 'Socks', price: 50 },
    { id: 3, title: 'Jacket', price: 350 },
    { id: 4, title: 'Shoes', price: 250 },
];
/**
 * Для уменьшения количества аргументов передается целиком объект
 * @param {*} item 
 */
const renderGoodsItem = (item) => {
    return `<div class="goods-item" data-id="${item.id}">
    <h3>${item.title}</h3>
    <p>$${item.price}</p>
    <button class="buy-btn">Купить</button></div>`;
};
/**
 * в качестве значенияпо умолчанию передается массив с одним элементом [{ id: 1, title: 'empty', price: 0 }]
 * @param {*} list  
 */
const renderGoodsList = (list = [{ id: 1, title: 'empty', price: 0 }]) => {
    let goodsList = list.map(item => renderGoodsItem(item));
    document.querySelector('.goods-list').innerHTML = goodsList.join('');
    // запятая возникает из-за неявного преобразования массива в строку
    //для удаления запятой используем метод массива join и в качестве сеператора ставим пустйю строку
}

renderGoodsList(goods);