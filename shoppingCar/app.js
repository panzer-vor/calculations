class Cart {
  constructor() {
    this.list = []
  }
  add(data) {
    this.list.push(data)
  }
  delete(id) {
    this.list = this.list.filter(item => item.id !==id )
  }
  getList() {
    return this.list.map(item => item.name).join('\n')
  }
}
// 单例模式
const getCart = (function () {
  let cart
  return () => {
    if (!cart) {
      cart = new Cart()
    }
    return cart
  }
})()

//主入口
class App {
  constructor(elId) {
    this.el = document.querySelector(`#${elId}`)
  }
  initShoppingCart() {
    const shoppingCart = new ShoppingCart(this)
    shoppingCart.init()
  }
  initList() {
    const list = new List(this)
    list.init()
  }
  init() {
    this.initShoppingCart()
    this.initList()
  }
}

// 购物车按钮
class ShoppingCart {
  constructor(app) {
    this.app = app
    this.el = document.createElement('div')
    this.cart = getCart()
  }
  initBtn() {
    const btn = document.createElement('button')
    btn.innerText = '购物车'
    btn.addEventListener('click', () => {
      this.showCart()
    })
    this.el.appendChild(btn)
  }
  showCart() {
    alert(this.cart.getList())
  }
  render() {
    this.app.el.append(this.el)
  }
  init() {
    this.initBtn()
    this.render()
  }
}

// 列表
class List {
  constructor(app) {
    this.app = app
    this.el = document.createElement('div')
  }
  loadData() {
    return new Promise(resolve => {
      resolve(itemLists)
    })
  }
  initItemList(data) {
    data.forEach(itemData => {
      const item = createItem(this, itemData)
      item.init()
    })
  }
  render() {
    this.app.el.append(this.el)
  }
  init() {
    this.loadData()
      .then(data => {
        this.initItemList(data)
      })
      .then(() => {
        this.render()
      })
  }
}

// 列表中的每一项
class Item {
  constructor(list, data) {
    this.list = list
    this.data = data
    this.el = document.createElement('div')
    this.cart = getCart()
  }
  initContent() {
    const el = this.el
    const data = this.data
    const name = document.createElement('p')
    name.innerText = `名称： ${data.name}`
    const price = document.createElement('p')
    price.innerText = `价格： ${data.price}`
    el.appendChild(name)
    el.appendChild(price)
  }
  initBtn() {
    const el = this.el
    const btn = document.createElement('button')
    const itemState = new ItemState(btn)
    btn.addEventListener('click', () => {
      if (itemState.handle()) {
        this.addToCart()
      } else {
        this.deleteFromCart()
      }
    })
    el.appendChild(btn)
  }
  addToCart() {
    this.cart.add(this.data)
  }
  deleteFromCart() {
    this.cart.delete(this.data.id)
  }
  render() {
    this.list.el.appendChild(this.el)
  }
  init() {
    this.initContent()
    this.initBtn()
    this.render()
  }
}

// 列表每一项的购物车状态
class ItemState {
  constructor(el) {
    this.el = el
    this.index = 0
    this.state = [
      {
        isInCart: false,
        value: '加入购物车',
      },
      {
        isInCart: true,
        value: '从购物车移出',
      }
    ]
    this.handle()
  }
  handle() {
    const index = this.index
    this.index = this.index ? 0 : 1
    this.el.innerText = this.state[index].value
    return index
  }
}

// 代理模式
function createDiscount(itemData) {
  return new Proxy(itemData, {
    get(target, key, receiver) {
      if (key === 'name') {
        return `${target[key]} 【折扣】`
      }
      if (key === 'price') {
        return target[key] * .8
      }
      return target[key]
    }
  })
}

// 工厂模式
function createItem(list, itemData) {
  if (itemData.discount) {
    itemData = createDiscount(itemData)
  }
  return new Item(list, itemData)
}