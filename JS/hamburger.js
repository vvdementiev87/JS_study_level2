class Hamburger {
    constructor() {
        this.size;
        this.stuffing;
        this.topping;
        this.toppingList = [
            { name: 'Small', price: 50, calories: 20 },
            { name: 'Large', price: 100, calories: 40 },
            { name: 'cheeze', price: 10, calories: 20 },
            { name: 'salat', price: 20, calories: 5 },
            { name: 'potato', price: 15, calories: 10 },
            { name: 'spice', price: 15, calories: 0 },
            { name: 'mayo', price: 20, calories: 5 },
        ];
        this.addToppings();
        this.getToppings();
        this.getSize();
        this.getStuffing();
        this.calculatePrice();
        this.calculateCalories();
    }
    addToppings() {
        this.getSize();
        this.getToppings();
        this.getStuffing();
    }
    getToppings() {
            let toppingList = document.getElementsByName('topping');
            for (let item of toppingList) {
                if (item.checked == true) {
                    this.topping = item.getAttribute('id');
                    return item.getAttribute('id');
                }
            }
        } // Получить список добавок 
    getSize() {
            let hamSize = document.getElementsByName('hamSize');
            for (let item of hamSize) {
                if (item.checked == true) {
                    this.size = item.getAttribute('id');
                    return item.getAttribute('id');
                }
            }
        } // Узнать размер гамбургера 
    getStuffing() {
            let stuffingArr = [];
            let stuffingList = document.getElementsByName('stuffing');
            for (let item of stuffingList) {
                if (item.checked == true) {

                    stuffingArr.push(item.getAttribute('id'));
                }
            }
            this.stuffing = stuffingArr;
            return stuffingArr
        } // Узнать начинку гамбургера 
    calculatePrice() {
            this.addToppings();
            let totalPrice = 0;
            totalPrice += this.toppingList.find(element => element.name === this.size).price;
            totalPrice += this.toppingList.find(element => element.name === this.topping).price;
            this.stuffing.forEach(stuffing => {
                totalPrice += this.toppingList.find(element => element.name === stuffing).price;
            })
            return totalPrice
        } // Узнать цену 
    calculateCalories() {
            this.addToppings();
            let totalCal = 0;
            totalCal += this.toppingList.find(element => element.name === this.size).calories;
            totalCal += this.toppingList.find(element => element.name === this.topping).calories;
            this.stuffing.forEach(stuffing => {
                totalCal += this.toppingList.find(element => element.name === stuffing).calories;
            })
            return totalCal
        } // Узнать калорийность 
}


let btn = document.getElementById('calculate');
btn.addEventListener('click', function() {
    if (document.querySelector('input[name="hamSize"]:checked') == null) {
        alert("Выберети размер гамбургера!");
        return
    }
    if (document.querySelector('input[name="topping"]:checked') == null) {
        alert("Выберети наполнитель!");
        return
    }
    let hamburger = new Hamburger;
    document.querySelector('.priceCount').innerHTML = '';
    document.querySelector('.priceCount').insertAdjacentText('beforeend', `${hamburger.calculatePrice()} $`);
    document.querySelector('.calCount').innerHTML = '';
    document.querySelector('.calCount').insertAdjacentText('beforeend', `${hamburger.calculateCalories()} cal`);

})