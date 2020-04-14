import * as fb from 'firebase'

class User {
  constructor (user) {
    this.name = user.displayName
    this.email = user.email
    this.photoUrl = user.photoURL
    this.emailVerified = user.emailVerified
    this.uid = user.uid
  }
}

export default {
  state: {
    user: null,
    users: [],
    userIsOwner: false
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
      if (payload) {
        if (!state.users[payload.uid]) {
          fb.database().ref('users/' + payload.uid).push(payload)
        } else {
          if ((Object.keys(state.users[payload.uid]).length) < 5) {
            fb.database().ref('users/' + payload.uid).remove()
            fb.database().ref('users/' + payload.uid).push(payload)
          }
        }
      }
    },
    loadUsers (state, payload) {
      state.users = payload
    },
    userIsOwner (state, payload) {
      if (state.user) {
        (state.user.uid === payload.ownerId) ? state.userIsOwner = true : state.userIsOwner = false
      }
    }
  },
  actions: {
    async registerUser ({ commit }, { email, password, name }) {
      commit('clearError')
      commit('setLoading', true)
      try {
        var user = await fb.auth().createUserWithEmailAndPassword(email, password)

        user.user.updateProfile({
          displayName: name,
          photoURL: 'https://img2.freepng.ru/20180503/ebw/kisspng-computer-icons-user-profile-5aea902d9a0176.5345658815253217736308.jpg'
        })
        user = await fb.auth().signInWithEmailAndPassword(email, password)
        commit('setUser', new User(user.user))
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async loginUser ({ commit }, { email, password }) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const user = await fb.auth().signInWithEmailAndPassword(email, password)
        commit('setUser', new User(user.user))
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async autoLoginUser ({ commit }, payload) {
      commit('setUser', new User(payload))
    },
    async logoutUser ({ commit }) {
      fb.auth().signOut()
      commit('setUser', null)
    },
    async loginGoogle ({ commit }) {
      var provider = new fb.auth.GoogleAuthProvider()
      try {
        const result = await fb.auth().signInWithPopup(provider)
        commit('setUser', new User(result.user))
      } catch (error) {
        commit('setError', error.message)
      }
    },
    async fetchUsers ({ commit }) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const users = await fb.database().ref('users').once('value')
        const usersList = {}
        Object.keys(users.val()).forEach(user => {
          const container = []
          Object.keys(users.val()[user]).forEach(cont => {
            container.push(users.val()[user][cont])
          })
          usersList[user] = container[0]
        })
        commit('loadUsers', usersList)
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    },
    userIsOwner ({ commit }, payload) {
      commit('userIsOwner', payload)
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    users (state) {
      return state.users
    },
    isUserLoggedIn (state) {
      return state.user !== null
    },
    userIsOwner (state) {
      return state.userIsOwner
    }
  }
}
