<template>
    <v-container class="fill-height pa-0 ma-0" fluid >
      <v-row align="center" justify="center" >
        <v-col cols="12"  sm="12" md="8" lg="6" class="pa-0 ma-0">
          <v-container class="pa-0 ma-0">
            <v-container class="display-3 pl-3 mb-10 pt-8 font-weight-thin d-none d-sm-flex">Оформление заказа</v-container>
            <v-container class="display-1 pl-3 mb-0 pt-0 font-weight-thin d-flex d-sm-none">Оформление заказа</v-container>
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

          <v-list-item-content class="d-none d-sm-flex">
            <v-list-item-title v-html="cartItem[0].title"></v-list-item-title>
            <v-list-item-subtitle  v-html="cartItem[0].breed"></v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-content class="d-flex d-sm-none">
            <v-list-item-title style="max-width: 70px" v-html="cartItem[0].title"></v-list-item-title>
            <v-list-item-subtitle style="max-width: 70px" v-html="cartItem[0].breed"></v-list-item-subtitle>
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
                    style="width: 60px"
                    type="number"
                    :value="cartItem[1]"
                    v-model="cartItem[1]"
                    color="#3E3E3E"
                    :rules="entryRules"
                  ></v-text-field>
              </v-container>
              <v-container>
                <v-layout class="pt-2">
                <v-spacer></v-spacer>
                <v-icon
                  color="error"
                  @click="deleteCartItem(cartItem[0])"
                  class="mr-3"
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
              <v-btn color="success" @click="createOrder" >Перейти к оплате</v-btn>
              </v-container>
        </v-list>
        </v-flex>
      </v-layout>
    </v-container>
          </v-container>

       </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'CreateOrder',
  data: () => ({
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
      if (!cartValue) {
        cartValue = '0'
      }
      return cartValue
    }
  },
  methods: {
    deleteCartItem (cartItem) {
      this.$store.dispatch('deleteCartItem', cartItem)
    },
    createOrder () {
      alert('Дальше следует создание заказа')
    },
    switchCart () {
      let status
      (this.cartIsOpen) ? status = '-500' : status = '56'
      this.$store.dispatch('switchCart')
      if (document.getElementById('cart')) {
        document.getElementById('cart')
          .setAttribute('style', 'top: ' + status + 'px !important;')
      }
    }
  },
  created () {
    this.switchCart()
  }
}
</script>

<style scoped>
.invisible-link {
  color: rgba(255, 255, 255, 1);
  text-decoration: none;
}
</style>
