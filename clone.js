// 浅拷贝 只能拷贝一层值
// 第一种 遍历
var obj = {
    a: {
      a1: { a2: 1 },
      a10: { a11: 123, a111: { a1111: 123123 } }
    },
    b: 123,
    c: "123"
  }
function shallowClone (obj) {
    let temp = {}
    for (let i in obj) {
        temp[i] = obj[i]
    }
    return temp
}
var obj1 = shallowClone(obj)
// 第二种   ...
var obj2 = {...obj}

// 第三种
var obj3 = Object.assign({}, obj)
console.log(obj1)
obj1.a.a1 = 1000  // 其他基于原始对象拷贝的对象也会变的
obj1.b = true
console.log(obj1)

// 深拷贝
// 递归实现
function deepClone(o) {
    let obj = {}
    for(let i in o) {
        if (typeof o[i] === 'object') {
            onj[i] = deepClone(o[i])
        } else {
            obj[i] = o[i]
        }
    }
    return obj
}

// 健全  增加类型校验  Array  null  regExp  Date

function deepClone2 (o) {
    if (Object.prototype.toString.call(o) === '[object Object]') { // 检测是不是对象
        let obj = {}
        for (let i in o) {
            if (o.hasOwnProperty(i)) {
                if (typeof o[i] === 'object') {
                    obj[i] = deepClone(o[i])
                } else {
                    obj[i] = o[i]
                }
            }
        }
        return obj
    } else {
        return o
    }
}

// 判断类型为Object
function isObject(o) {
    return Object.prototype.toString.call(o) == '[object Object]' || Object.prototype.toString.call(o) == '[object Array]'
}

// 增加数据类型的深拷贝

function deepClone3 (o) {
    if (isObject(o)) {
        let obj = Array.isArray(o) ? [] : {}
        for (let i in o) {
            if (isObject(o[i])) {
                obj[i] = deepClone(o[i])
            } else {
                obj[i] = o[i]
            }
        }
        return obj
    } else {
        return o
    }
}

// 有可能会碰到循环引用问题 let a = {} a.a = a  clone(a) 会造成死循环 增加循环检测

function deepClone4(o,hash= new map()) {
    if (!isObject(o)) return o //判断是否为对象或者数组
    if (hash.has(o)) return hash.get(o)
    let obj = Array.isArray(o) ? [] : {}

    hash.set(o,obj)
    for(let i in o) {
        if (isObject(o[i])) {
            obj[i] = deepClone4(o[i], hash)
        } else {
            obj[i] = o[i]
        }
    }
    return obj
}

// 利用JSON.stringify() 实现深拷贝
function cloneJson(o) {
    return JSON.parse(JSON.stringify(o))
}