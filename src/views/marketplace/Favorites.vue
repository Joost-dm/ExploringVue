<template>
    <v-container class="fill-height pa-0 ma-0" fluid >
      <v-row align="center" justify="center" >
        <v-col cols="12"  sm="12" md="8" lg="6" class="pa-0 ma-0">
          <v-container class="pa-0 ma-0">
            <v-container class="display-3 pl-3 mb-10 pt-8 font-weight-thin d-none d-sm-flex">Избранное</v-container>
            <v-container class="display-1 pl-3 mb-0 pt-0 font-weight-thin d-flex d-sm-none">Избранное</v-container>
            <v-container class="ml-3" v-if="!favorite_products[0]">
              Здесь показываются товары, отмеченные вами, как избранные.
            </v-container>
            <v-container class="ml-3" v-if="!favorite_products[0]">
              Вы не отметили ниодного товара.
            </v-container>
            <router-link v-if="!favorite_products[0]" class="invisible-link" to="../">
              <v-btn class="mt-3 ml-5" v-if="!favorite_products[0]">добавить</v-btn>
            </router-link>
            <v-container class="pa-0 ma-0 list-item "  v-for="(favoriteProduct, i) in favorite_products" :key="-i">
            <v-list-item class="pa-0 ma-0">
              <v-layout>
                <v-container class="pa-0 ma-0" style="width: 72px; height: 72px">
                <v-list-item-avatar height="56" width="56" class="list-item-img">
                  <v-img :src="favoriteProduct.imageSrc"></v-img>
                </v-list-item-avatar>
                <v-icon  color="#C2AE95" style="position: relative; bottom: 75px; left: 60px">mdi-star</v-icon>
                </v-container>
                <v-container>
                  <v-layout>
                    <v-list-item-title>{{favoriteProduct.title}}</v-list-item-title>
                    <v-spacer></v-spacer>
                    <div class="pa-0 mt-3">
                    <v-icon class="mr-3" color="#3E3E3E" dense @click="addToCart(favoriteProduct)">mdi-cart</v-icon>
                    </div>
                    <div class="pa-0 mt-3">
                    <v-icon class="mr-3" color="error" @click="toggleFavorite(favoriteProduct.id)">mdi-close</v-icon>
                    </div>
                  </v-layout>
                </v-container>
              </v-layout>
            </v-list-item>
            <v-divider></v-divider>
            </v-container>
          </v-container>
       </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Favorites',
  data () {
    return {
    }
  },
  computed: {
    user_favorites () {
      return this.$store.getters.user_favorites
    },
    products () {
      return this.$store.getters.products
    },
    favorite_products () {
      return this.$store.getters.favorite_products
    },
    cartIsOpen () {
      return this.$store.getters.cartIsOpen
    }
  },
  methods: {
    addToCart (product) {
      this.$store.dispatch('addToCart', product)
      this.openCart()
    },
    toggleFavorite (id) {
      this.$store.dispatch('toggleFavorite', id)
      console.log(this.$store.getters.favorite_products)
    },
    openCart () {
      if (!this.cartIsOpen) {
        this.$store.dispatch('switchCart')
        setTimeout(this.closeCart, 1000)
      }
      document.getElementById('cart').setAttribute('style', 'top: 56px !important;')
    },
    closeCart () {
      console.log(this.cartIsOpen)
      if (this.cartIsOpen) {
        this.$store.dispatch('switchCart')
      }
      document.getElementById('cart').setAttribute('style', 'top: -500px !important;')
    }
  },
  created () { // Точка монтирования
    this.$store.dispatch('checkForLocalFavorites')
  }
}
</script>

<style scoped>
.list-item:hover {
  background-color: rgba(0, 0, 0, 0.08);
}
.list-item-img {
  border-radius: 5px;
}

.invisible-link {
  color: rgba(255, 255, 255, 0);
  text-decoration: none;
}
</style>
