export default {
  state: {
    cartIsOpen: false,
    cart: []
  },
  getters: {
    cart (state) {
      return state.cart
    },
    cartIsOpen (state) {
      return state.cartIsOpen
    }
  },
  mutations: {
    addToCart (state, payload) {
      var incart = false
      for (let i = 0; i < state.cart.length; i++) {
        if (state.cart[i][0].title === payload.title) {
          state.cart[i][1]++
          incart = true
          var d = state.cart.reverse()
          state.cart = d.reverse()
        }
      }
      if (!incart) {
        state.cart.push([payload, 1])
        localStorage.setItem('cart', JSON.stringify(state.cart))
      }
    },
    checkForLocalCart (state) {
      if (localStorage.getItem('cart')) {
        state.cart = JSON.parse(localStorage.getItem('cart'))
      } else {
        state.cart = []
      }
    },
    deleteCartItem (state, payload) {
      for (let i = 0; i < state.cart.length; i++) {
        if (state.cart[i][0] === payload) {
          state.cart.splice(i, 1)
        }
      }
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    switchCart (state) {
      state.cartIsOpen = !state.cartIsOpen
    }
  },
  actions: {
    addToCart ({ commit }, payload) {
      // payload.id = 'testId'
      commit('addToCart', payload)
    },
    deleteCartItem ({ commit }, payload) {
      commit('deleteCartItem', payload)
    },
    switchCart ({ commit }) {
      commit('switchCart')
    },
    checkForLocalCart ({ commit }) {
      commit('checkForLocalCart')
    }
  }
}
