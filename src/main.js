import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import store from './store'
import * as fb from 'firebase/app'

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App),
  created () {
    var firebaseConfig = {
      apiKey: 'AIzaSyAHnteKKbiKkKepnCZTKTBcOJIKm-EB62s',
      authDomain: 'training-69855.firebaseapp.com',
      databaseURL: 'https://training-69855.firebaseio.com',
      projectId: 'training-69855',
      storageBucket: 'training-69855.appspot.com',
      messagingSenderId: '232536138855',
      appId: '1:232536138855:web:2b9f5eef82a11e66f7a0c2',
      measurementId: 'G-RT2NZJ57YR'
    }
    fb.initializeApp(firebaseConfig)
    fb.analytics()
    this.$store.dispatch('fetchProducts')
    fb.auth().onAuthStateChanged(user => {
      this.$store.dispatch('fetchUsers')
        .then(() => {
          if (user) {
            this.$store.dispatch('autoLoginUser', user)
              .then(() => {
                this.$store.dispatch('fetchUserProducts')
              })
          }
        })
        .catch(() => {})
    })
  }
}).$mount('#app')
