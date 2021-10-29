// call apply bind的实现  
// call 和 apple 实现的思路
// 1.判断是否是函数调用，若非函数调用抛出异常
// 2.通过新对象(context)来调用函数   给 context创建一个fn 设置为需要调用的函数  结束调用后删除fn

// bind实现的思路
// 1.判断是否是函数调用，若非函数调用抛出异常
// 2. 返回函数 判断函数的调用方式，是否是被new 出来的  new出来的话返回空对象，实例的__proto__ 指向_this的prototype
// 3. 完成函数柯里化  Array.prototype.slice.call() 

Function.prototype.myCall = function (context) {
    if(typeof(this) !== 'function') {
        return new TypeError('not a function')
    }
    context = context || window
    context.fn = this
    let args = Array.from(arguments).splice(1)
    let result = context.fn(...args)
    delete context.fn
    return result
}

Function.prototype.myApply = function(context) {
    if (typeof(this) !== 'function') {
        return new TypeError('not a function')
    }
    context = context || window
    let result
    context.fn = this
    if (arguments[1]) {
        result = context.fn(...arguments[1])
    } else {
        result = context.fn()
    }
    
    delete context.fn
    return result
}

Function.prototype.mybind = function(context) {
    if (typeof(this) !== 'function') {
        return new TypeError('not a function')
    }
    const _this = this
    const args = Array.prototype.slice.call(arguments,1)
    return function F() {
        if (this instanceof F) {
            return new _this(...args, ...arguments)
        } else {
            return _this.apply(context,args.concat(...arguments))
        }
    }
}