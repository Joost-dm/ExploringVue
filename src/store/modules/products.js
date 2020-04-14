import * as fb from 'firebase'

class Product {
  constructor (title, breed, description, price, ownerId, imageSrc = '', id = null) {
    this.title = title
    this.breed = breed
    this.description = description
    this.price = price
    this.ownerId = ownerId
    this.imageSrc = imageSrc
    this.id = id
  }
}
export default {
  state: {
    products: [],
    user_products: []
  },
  mutations: {
    addProduct (state, payload) {
      state.products.push(payload)
    },
    loadProducts (state, payload) {
      state.products = payload
    },
    fetchUserProducts (state) {
      state.user_products = []
      state.products.forEach(product => {
        if (product.ownerId === fb.auth().currentUser.uid) { state.user_products.push(product) }
      })
    }
  },
  actions: {
    async addProduct ({ commit, getters }, payload) {
      commit('clearError')
      commit('setLoading', true)
      const image = payload.image
      try {
        const newProduct = new Product(
          payload.title,
          payload.breed,
          payload.description,
          payload.price,
          getters.user.uid,
          ''
        )
        const product = await fb.database().ref('products').push(newProduct)
        const fileData = await fb.storage().ref(`products/${product.key}`).put(image)
        const imageSrc = await fb.storage().ref().child(fileData.ref.fullPath).getDownloadURL()
        await fb.database().ref('products').child(product.key).update({ imageSrc })
        commit('setLoading', false)
        commit('addProduct', {
          ...newProduct,
          id: product.key,
          imageSrc
        })
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    },
    async fetchProducts ({ commit }) {
      commit('clearError')
      commit('setLoading', true)
      const resultProducts = []
      try {
        const productsVal = await fb.database().ref('products').once('value')
        const products = productsVal.val()
        Object.keys(products).forEach(key => {
          const product = products[key]
          resultProducts.push(
            new Product(
              product.title,
              product.breed,
              product.description,
              product.price,
              product.ownerId,
              product.imageSrc,
              key
            )
          )
          commit('loadProducts', resultProducts)
          commit('setLoading', false)
        })
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    },
    fetchUserProducts ({ commit }) {
      commit('fetchUserProducts')
    },
    deleteProduct ({ commit }, payload) {
      fb.database().ref('products/' + payload.id).remove()
      fb.storage().ref().child('products/' + payload.id).delete()
    },
    async editProduct ({ commit }, payload) {
      commit('clearError')
      commit('setLoading', true)
      try {
        await fb.database().ref('products').child(payload.id).update(payload)
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }

      commit('setLoading', false)
    }
  },
  getters: {
    products (state) {
      return state.products
    },
    user_products (state) {
      return state.user_products
    }
  }
}
