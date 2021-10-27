// 原型继承
// 把父类的实例作为子类的原型
// 缺点：子类的实例共享了父类构造函数的引用属性    不能传参

// var person = {
//     friends: ['a', 'b', 'c']
// }
// var p1 = Object.create(person)

// console.log(p1)
// console.log(p1.friends)
// p1.friends.push('d')
// console.log(person.friends)

// 组合继承
// 在子函数中运行父函数，用call改变this指向
// 再在父函数的构造函数赋值给子函数的prototype，以继承父类原型中的方法，最后改变一下constructor
// 缺点： 调用了两次父类的构造函数，造成了不必要的消耗，父类方法可以复用
// 优点： 可以传参，不共享父类的引用属性

function Father (name) {
    this.name = name
    this.age = 66
}
Father.prototype.getName = function () {
    console.log(this.name)
}

function Son (name, age) {
    Father.call(this,name)
    this.age = age
}
Son.prototype = new Father()
Son.prototype.construtor = Son

var son = new Son('han', 22)
console.log(son)

// 寄生组合继承

// function Father (name) {
//     this.name = name
//     this.age = 66
// }
// Father.prototype.getName = function () {
//     console.log(this.name)
// }

// function Son (name, age) {
//     Father.call(this,name)
//     this.age = age
// }
// Son.prototype = Object.create(Father.prototype)
// Son.prototype.construtor = Son

// var son = new Son('han', 22)
// console.log(son)

// ES6 extends继承（寄生组合继承的语法糖）
// 子类只继承父类，可以不写constructor ，一旦写了，则必须先写super

// function Father (name) {
//     this.name = name
//     this.age = 66
// }
// Father.prototype.getName = function () {
//     
// }
// class Son extends Father {
//     construtor (x) {
//         super('哈哈') // super('哈哈')  <=> Fatehr.call(this,'哈哈')
//     }   
// }