class Hamburger {
    constructor(size, stuffing) {
        this.size=size;
        this.stuffing=stuffing;
        this.topping;
        this.toppings=[
            {name:'cheeze', price:10, calories:20},
            {name:'salat', price:20, calories:5},
            {name:'potato', price:15, calories:10},
            {name:'spice', price:15, calories:0},
            {name:'mayo', price:20, calories:5},
        ];
        this.getSize();
    }
    addTopping(topping) {}    // Добавить добавку 
    removeTopping(topping) {} // Убрать добавку 
    getToppings(topping) {}   // Получить список добавок 
    getSize() {
        let hamSize=document.getElementsByName('topping');
        for(let item of hamSize){
            if (item.checked==true){
                console.log(item.getAttribute('id'))
                this.topping=item.getAttribute('id');
            }
        }
    }              // Узнать размер гамбургера 
    getStuffing() {
        let hamSize=document.getElementsByName('hamSize');
        for(let item of hamSize){
            if (item.checked==true){
                console.log(item.getAttribute('id'))
                this.size=item.getAttribute('id');
            }
        }
    }          // Узнать начинку гамбургера 
    calculatePrice() {}       // Узнать цену 
    calculateCalories() {}    // Узнать калорийность 
  }

  let hamburger=new Hamburger;
  let btn=document.getElementById('calculate');
  btn.addEventListener('click',function(){
    hamburger.getSize();
    hamburger.getStuffing();
  })