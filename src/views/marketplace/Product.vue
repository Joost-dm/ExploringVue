<template>
    <v-container>
      <v-layout row>
        <v-flex
          cols="12"
          sm="12"
          md="10"
          lg="8"
          class="mb-8"
        >
          <v-card
            class="mx-auto product-card"
            elevation="12"
            raised
            max-width="800px"
            v-if="product"
          >
            <v-img
              :src="product.imageSrc"
              max-height="400px"
            ></v-img>
            <v-card-title>
              {{product.title}}
              <v-spacer></v-spacer>
              <v-icon v-if="user_favorites.has(product.id)"
                @click="toggleFavorite(product.id)"
                :id="'fav' + product.id"
                class="display-1"
                style="color: #C2AE95"
                >mdi-star</v-icon>
              <v-icon v-else
                @click="toggleFavorite(product.id)"
                :id="'fav' + product.id"
                class="display-1"
                style="color: #3E3E3E"
                >mdi-star</v-icon>
            </v-card-title>

            <v-card-subtitle
            class="card-description">
              <br>
              <b>Порода: </b> {{product.breed}}<br>
              <b>Описание: </b>{{product.description}}<br>
              <v-spacer></v-spacer>
              <v-divider></v-divider>
              <br>
              <b>Продавец: </b>{{users[product.ownerId].name}}<br>
              <br>
            </v-card-subtitle>

            <v-card-subtitle>
              <h2>Цена: {{product.price}} руб.</h2>
            </v-card-subtitle>

            <v-card-actions>

              <v-spacer></v-spacer>
              <router-link v-if="userIsOwner" class="invisible-link" :to="{name: 'EditProduct', params: {id:product.id}}">
                  <v-btn>
                <v-icon>mdi-file-document-edit-outline</v-icon>
              </v-btn>
                </router-link>
              <v-btn class="ml-2" @click="deleteProduct" v-if="userIsOwner">
                <v-icon  color="error" >mdi-close</v-icon>
              </v-btn>
              <v-btn @click="addToCart(product)">
                <v-icon color="#3E3E3E">mdi-cart</v-icon>
              </v-btn>
            </v-card-actions>

          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
export default {
  name: 'Product',
  data () {
    return {
    }
  },
  props: ['id'],
  computed: {
    products () {
      return this.$store.getters.products
    },
    product () {
      return this.$store.getters.products.find(item => item.id === this.id)
    },
    users () {
      return this.$store.getters.users
    },
    cartIsOpen () {
      return this.$store.getters.cartIsOpen
    },
    user_favorites () {
      return this.$store.getters.user_favorites
    },
    userIsOwner () {
      return this.$store.getters.userIsOwner
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
    toggleFavorite (id) {
      this.$store.dispatch('toggleFavorite', id)
    },
    async deleteProduct () {
      await this.$store.dispatch('deleteProduct', this.product)
      await this.$store.dispatch('fetchProducts')
      await this.$store.dispatch('fetchUserProducts')
      this.$router.push('/marketplace/list/')
    }
  },
  created () {
    this.$store.dispatch('userIsOwner', this.product)
  }
}

</script>

<style scoped>
.invisible-link {
  color: rgba(255, 255, 255, 0);
  text-decoration: none;
}
</style>
