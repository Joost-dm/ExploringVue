import products from './products'

export default {
  state: {
    user_favorites: new Set(),
    favorite_products: [],
    products: products.state.products
  },
  getters: {
    user_favorites (state) {
      return state.user_favorites
    },
    favorite_products (state) {
      state.favorite_products = []
      for (let i = 0; i < products.state.products.length; i++) {
        if (state.user_favorites.has(products.state.products[i].id)) {
          state.favorite_products.push(products.state.products[i])
        }
      }
      return state.favorite_products
    }
  },
  mutations: {
    toggleFavorite (state, id) {
      if (state.user_favorites.has(id)) {
        state.user_favorites.delete(id)
        state.favorite_products = []
        for (let i = 0; i < state.products.length; i++) {
          if (state.user_favorites.has(state.products[i].id)) {
            state.favorite_products.push(state.products[i])
          }
        }
        if (document.getElementById('fav' + id)) {
          document.getElementById('fav' + id).setAttribute('style', 'color: #3E3E3E')
        }
      } else {
        state.user_favorites.add(id)
        if (document.getElementById('fav' + id)) {
          document.getElementById('fav' + id).setAttribute('style', 'color: #C2AE95')
        }
      }
      localStorage.setItem('favorites', Array.from(state.user_favorites)) // Точка монтирования
    },
    checkForLocalFavorites (state) {
      if (localStorage.getItem('favorites')) {
        state.user_favorites = new Set(localStorage.getItem('favorites').split(','))
      }
    }
  },
  actions: {
    toggleFavorite ({ commit }, payload) {
      commit('toggleFavorite', payload)
    },
    checkForLocalFavorites ({ commit }) {
      commit('checkForLocalFavorites')
    }
  }
}
