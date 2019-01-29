const Stack = (function () {
  // 为了声明唯一变量采用闭包的方式
  let _stack = Symbol()
  class S {
    constructor () {
      this[_stack] = []
    }
    push (val) {
      this[_stack].push(val)
    }
    pop () {
      this[_stack].pop()
    }
    size () {
      return this[_stack].length
    }
    clear () {
      this[_stack] = []
    }
    get () {
      return this[_stack]
    }
  }
  return S
}())

const s = new Stack()
s.push(1)
s.push(2)
s.push(3)
s.push(1)
s.pop()
s.pop()
console.log(s.get())  // 1, 2
console.log(s.size())  // 2
s.clear()
console.log(s.size())  // 0
