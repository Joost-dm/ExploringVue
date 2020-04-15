<template>
  <div>
  <v-navigation-drawer
  v-model="primaryDrawer.model"
  :floating="true"
  app
  dark
  overflow
  >
    <v-list>
      <v-subheader>НАВИГАЦИЯ</v-subheader>
      <v-list-item-group v-model="link" color="primary">
        <v-list-item
          v-for="(link, i) in links"
          :key="i"
          :to="link.url"
          exact
        >
          <v-list-item-icon>
            <v-icon v-text="link.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="link.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>

  <v-app-bar
    :clipped-left="primaryDrawer.clipped"
    app
    dark
    id="app-header"
    >
      <v-app-bar-nav-icon
        @click.stop="primaryDrawer.model = !primaryDrawer.model"
      />
      <router-link class="invisible-link" to="/">
      <v-toolbar-title
        class="font-weight-thin font-weight-light d-none d-sm-flex">тренировочная площадка
      </v-toolbar-title>
      <v-toolbar-title
        class="font-weight-thin subtitle-1 d-flex d-sm-none">тренировочная площадка
      </v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <v-container style="width: 300px" class="d-none d-sm-flex" v-if="user" >
      <v-layout>
      <v-avatar class="mt-2" size="32"><v-img style="background-color: lightsteelblue" v-if="user.photoUrl" :src=user.photoUrl></v-img></v-avatar>
      <v-container class="ma-0" v-if="user">{{user.name}}</v-container>
      </v-layout>
      </v-container>
      <v-badge bottom left :content="cartValue" dense style="z-index: 2" color="success"></v-badge>
      <v-icon @click="switchCart" >mdi-cart</v-icon>
      <v-icon @click="logout" v-if="isUserLoggedIn" class="ml-6">mdi-logout</v-icon>
      <v-icon @click="login" v-else class="ml-6">mdi-login</v-icon>

  </v-app-bar>

    <v-container id="cart" class="elevation-24">
      <v-layout row>
        <v-flex >
          <v-list>
            <v-container v-if="!this.cartSum" class="pl-10 mt-2 pr-5" row>
              <v-spacer></v-spacer>
              <h4>Корзина пуста </h4> <v-icon class="ml-3">mdi-emoticon-sad-outline</v-icon>
            </v-container>
          <v-container v-else id="scrolled-cart-list" class="pa-0 ma-0">
          <v-container
          v-for="cartItem in cart"
          :key="cartItem[0].title"
          class="pa-0 ma-0 cart-line"
          >
            <v-layout>
          <v-list-item class="cart-mainhalfline">
          <v-list-item-avatar height="56" width="56" class="cart-item-img">
            <v-img :src="cartItem[0].imageSrc"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-html="cartItem[0].title"></v-list-item-title>
            <v-list-item-subtitle v-html="cartItem[0].breed"></v-list-item-subtitle>
          </v-list-item-content>

        </v-list-item>
            <v-container class="pa-0 ma-0">
              <v-layout>
              <v-container class="pa-0 ma-0">
                <v-text-field
                    :label="cartItem[0].price * cartItem[1] + ' руб.'"
                    max="50"
                    min="1"
                    step="1"
                    style="width: 80px"
                    type="number"
                    :value="cartItem[1]"
                    v-model="cartItem[1]"
                    color="#3E3E3E"
                    :rules="entryRules"
                  ></v-text-field>
              </v-container>
              <v-container>
                <v-layout class="pt-2 pr-5">
                <v-spacer></v-spacer>
                <v-icon
                  color="error"
                  @click="deleteCartItem(cartItem[0])"
                >mdi-close
                </v-icon>
                </v-layout>
              </v-container>
                </v-layout>
            </v-container>
              </v-layout>
            <v-divider></v-divider>
            </v-container>
            </v-container>
              <v-container v-if="cartSum" class="pl-10 mt-2 pr-5" row>
              <h3 >Итого: {{cartSum}} руб.</h3>
              <v-spacer></v-spacer>
              <router-link class="invisible-link" :to="{name: 'CreateOrder'}">
              <v-btn color="success" >оформить заказ</v-btn>
              </router-link>
              </v-container>
        </v-list>
        </v-flex>
      </v-layout>
    </v-container>

  <!-- Sizes your content based upon application components -->
  <v-content>

    <!-- Provides the application the proper gutter -->
    <v-container fluid class="pa-4">
      <!-- If using vue-router -->
      <router-view></router-view>
    </v-container>
  </v-content>
  </div>
</template>

<script>
export default {
  data: () => ({
    primaryDrawer: {
      model: null
    },
    link: 1,
    entryRules: [
      v => !!v || 'Укажите кол-во',
      v => (v % 1) === 0 || 'Должно быть целым'
    ]
  }),
  computed: {
    cart () {
      return this.$store.getters.cart
    },
    cartIsOpen () {
      return this.$store.getters.cartIsOpen
    },
    products () {
      return this.$store.getters.products
    },
    cartSum () {
      var cartSum = 0
      if (this.cart[0]) {
        for (let i = 0; i < this.cart.length; i++) {
          cartSum += this.cart[i][0].price * this.cart[i][1]
        }
      }
      return cartSum
    },
    cartValue () {
      var cartValue = 0
      for (let i = 0; i < this.cart.length; i++) {
        cartValue = +cartValue + +this.cart[i][1]
      }
      if (!cartValue) { cartValue = '0' }
      return cartValue
    },
    isUserLoggedIn () {
      return this.$store.getters.isUserLoggedIn
    },
    links () {
      if (this.isUserLoggedIn) {
        return [
          { text: 'Главная', icon: 'mdi-home', url: '/' },
          { text: 'ToDo приложение', icon: 'mdi-chevron-down-box-outline', url: '/todo' },
          { text: 'Магазин', icon: 'mdi-cart-outline', url: '/marketplace/' },
          { text: 'Избранное', icon: 'mdi-star', url: '/marketplace/favorites' },
          { text: 'Мои товары', icon: 'mdi-dolly', url: '/marketplace/list/' },
          { text: 'Добавить товар', icon: 'mdi-plus-box-outline', url: '/marketplace/add' }
        ]
      } else {
        return [
          { text: 'Главная', icon: 'mdi-home', url: '/' },
          { text: 'ToDo приложение', icon: 'mdi-chevron-down-box-outline', url: '/todo' },
          { text: 'Регистрация', icon: 'mdi-account-edit', url: '/register' },
          { text: 'Авторизация', icon: 'mdi-login', url: '/login' },
          { text: 'Магазин', icon: 'mdi-cart-outline', url: '/marketplace/' },
          { text: 'Избранное', icon: 'mdi-star', url: '/marketplace/favorites' }
        ]
      }
    },
    user () {
      return this.$store.getters.user
    }
  },
  methods: {
    switchCart () {
      let status
      (this.cartIsOpen) ? status = '-500' : status = '56'
      this.$store.dispatch('switchCart')
      document.getElementById('cart').setAttribute('style', 'top: ' + status + 'px !important;')
    },
    deleteCartItem (cartItem) {
      this.$store.dispatch('deleteCartItem', cartItem)
    },
    login () {
      this.$router.push('/login')
    },
    logout () {
      this.$store.dispatch('logoutUser')
      this.$router.push('/')
    }
  },
  created () {
    this.$store.dispatch('checkForLocalCart')
  }
}
</script>

<style scoped>

.v-item--active {
  background-color: bisque !important;
  color: black !important;
}
#app-header{
  background-color: #3E3E3E;
  z-index: 3
}

#cart {
  width: 600px;
  background-color: white;
  position: fixed;
  z-index: 2;
  top: -500px;
  right: 80px;
  border-radius: 0 0 5px 5px;
  transition: 0.4s;
}

.cart-item-img {
  border-radius: 5px;
}
.cart-line {
  transition: 0.1s;
  max-height: 90px;
}
.cart-line:hover {
  background-color: rgba(0, 0, 0, 0.08);
}

#scrolled-cart-list {
  overflow-y: scroll;
  max-height: 40vh;
}

.cart-mainhalfline {
  max-width: 50%;
}

.invisible-link {
  color: rgba(255, 255, 255, 1);
  text-decoration: none;
}

@media screen and (max-width: 959px) {
#cart {
  width: 400px;
  right: 20px;
}
}

@media screen and (max-width: 600px) {
#cart {
  width: 100%;
  right: 0;
}}
</style>
