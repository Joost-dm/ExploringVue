<template>
    <v-container class="fill-height pa-0 ma-0" fluid >
      <v-row align="center" justify="center" >
        <v-col cols="12"  sm="12" md="8" lg="6" class="pa-0 ma-0">
          <v-container class="pa-0 ma-0">
            <v-container class="display-3 pl-3 mb-10 pt-8 font-weight-thin d-none d-sm-flex">Мои товары</v-container>
            <v-container class="display-1 pl-3 mb-0 pt-0 font-weight-thin d-flex d-sm-none">Мои товары</v-container>
            <v-container class="ml-3" v-if="!user_products[0]">
              Эта страница позваляет просматривать и редактировать товары, добавленные вами.
            </v-container>
            <v-container class="ml-3" v-if="!user_products[0]">
              Вы не добавили ниодного товара.
            </v-container>
            <router-link v-if="!user_products[0]" class="invisible-link" to="../add">
              <v-btn class="mt-3 ml-5" v-if="!user_products[0]">добавить</v-btn>
            </router-link>

            <v-container
              class="pa-0 ma-0 list-item ml-3"  v-for="(Product, i) in user_products" :key="-i"
            >
              <v-list-item class="pa-0 ma-0">
              <v-layout>
                <v-container class="pa-0 ma-0" style="width: 72px; height: 72px">
                <v-list-item-avatar height="56" width="56" class="list-item-img">
                  <v-img :src="Product.imageSrc"></v-img>
                </v-list-item-avatar>
                </v-container>
                <v-container>
                  <v-layout>
                    <v-list-item-title
                      class="d-none d-sm-flex" >{{Product.title}}
                    </v-list-item-title>
                    <v-list-item-title
                      class="d-flex d-sm-none caption" style="max-width: 100px">{{Product.title}}
                    </v-list-item-title>
                    <v-spacer></v-spacer>
                    <div class="pa-0 mt-3">
                    <router-link v-if="Product" class="invisible-link" :to="{name: 'EditProduct', params: {id:Product.id}}">
                      <v-icon
                        class="mr-3" color="#3E3E3E" dense @click="editProduct(Product)">mdi-file-document-edit-outline
                      </v-icon>
                    </router-link>
                    </div>
                    <div class="pa-0 mt-3">
                    <v-icon class="mr-3" color="#3E3E3E" dense @click="addToCart(Product)">mdi-cart</v-icon>
                    </div>
                    <div class="pa-0 mt-3">
                    <v-icon class="mr-3" color="error" @click="deleteProduct(Product)">mdi-close</v-icon>
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
  name: 'ProductList',
  data () {
    return {
    }
  },
  computed: {
    products () {
      return this.$store.getters.products
    },
    user_products () {
      return this.$store.getters.user_products
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
    },
    async deleteProduct (product) {
      await this.$store.dispatch('deleteProduct', product)
      await this.$store.dispatch('fetchProducts')
      await this.$store.dispatch('fetchUserProducts')
    },
    editProduct (product) {
    }
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
