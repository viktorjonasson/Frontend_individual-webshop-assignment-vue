import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => {
    return {
      // for initially empty lists
      cartList: [] as CartContent[],
      // for data that is not yet loaded
      cartItem: null as CartContent | null,
    }
  },

  actions: {
    addToCart(id: number, quantity: number = 1) {
      const existingItem = this.cartList.find((item) => item.id === id)

      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        this.cartList.push({ id, quantity })
      }
      this.saveCart()
    },

    removeFromCart(id: number) {
      this.cartList = this.cartList.filter((item) => item.id !== id)
      this.saveCart()
    },

    updateQuantity(id: number, adjustment: number) {
      const item = this.cartList.find((item) => item.id === id)
      if (item && adjustment === -1) {
        item.quantity--
      } else if (item && adjustment === 1) {
        item.quantity++
      }
    },

    clearCart() {
      this.cartList = []
      this.saveCart()
    },

    saveCart() {
      localStorage.setItem('cart', JSON.stringify(this.cartList))
    },

    loadCart() {
      const savedCart = localStorage.getItem('cart')
      if (savedCart) {
        this.cartList = JSON.parse(savedCart)
      }
    },
  },

  getters: {
    cartCount: (state) => {
      return state.cartList.reduce((count, item) => count + item.quantity, 0)
    },

    isInCart: (state) => (id: number) => {
      return state.cartList.some((item) => item.id === id)
      //Some determines whether the specified callback function returns true for any element of an array.
    },

    getItemQuantity: (state) => (id: number) => {
      const item = state.cartList.find((item) => item.id === id)
      return item ? item.quantity : 0
    },
  },
})

interface CartContent {
  id: number
  quantity: number
}
