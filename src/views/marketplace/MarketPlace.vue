<template>
  <div v-if="!loading">
    <v-container fluid>
      <v-layout row>
        <v-flex xs12>
          <v-carousel
            cycle
            height="400"
            hide-delimiter-background
            show-arrows-on-hover
          >
            <v-carousel-item
              v-for="(slide, i) in slides"
              :key="i"
            >
              <v-sheet
                :color="colors[i]"
                height="100%"
              >
                <v-row
                  class="fill-height"
                  align="center"
                  justify="center"
                >
                  <div class="display-3">{{ slide }}</div>
                </v-row>
              </v-sheet>
            </v-carousel-item>
          </v-carousel>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container>
      <v-layout row>
        <v-flex
          cols="12"
          sm="6"
          md="4"
          lg="3"
          v-for="(product, i) in products"
          :key = "i"
          class="mb-8"
        >
          <v-card
            class="mx-auto product-card"
            max-width="344"
            elevation="12"
            raised
          >
            <v-img
              :src="product.imageSrc"
              height="200px"
            ></v-img>
            <v-card-title>
              {{product.title}}
              <v-spacer></v-spacer>
              <v-icon v-if="user_favorites.has(product.id)"
                @click="toggleFavorite(product.id)"
                :id="'fav' + product.id"
                class="display-1 "
                style="color: #C2AE95"
                >mdi-star</v-icon>
              <v-icon v-else
                @click="toggleFavorite(product.id)"
                :id="'fav' + product.id"
                class="display-1 favorite-star"
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
            </v-card-subtitle>

            <v-card-subtitle>
              <h2>Цена: {{product.price}} руб.</h2>
            </v-card-subtitle>

            <v-card-actions>
             <v-btn
                icon
                @click="show = !show"
              >
                <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
              </v-btn>

              <v-spacer></v-spacer>

              <v-btn class="product-info-button">
                <router-link :to="{name: 'Product', params: {id:product.id}}">
                  <v-icon color="#C2AE95">mdi-information-outline</v-icon>
                </router-link>
              </v-btn>
              <v-btn @click="addToCart(product)">
                <v-icon color="#3E3E3E">mdi-cart</v-icon>
              </v-btn>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="show">
                <v-divider></v-divider>
                <v-card-text v-if="users[product.ownerId]">
                   Добавил: {{users[product.ownerId].name}}
                </v-card-text>
              </div>
            </v-expand-transition>

          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    </div>
  <div v-else>
    <v-container>
      <v-layout row>
        <v-flex xs12 class="text-center pt-5" >
          <v-progress-circular
            :size="120"
            :width="5"
            color="#363636"
            indeterminate
          ></v-progress-circular>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      colors: [
        'indigo',
        'warning',
        'pink darken-2',
        'red lighten-1',
        'deep-purple accent-4',
        'success'
      ],
      slides: [
        'Best Cats',
        'Cats Shop',
        'Meeeooow',
        'Best Cats',
        'Cats Shop',
        'Meeeooow'
      ],
      show: false
    }
  },
  computed: {
    products () {
      return this.$store.getters.products
    },
    cart () {
      return this.$store.getters.cart
    },
    cartIsOpen () {
      return this.$store.getters.cartIsOpen
    },
    user_favorites () {
      return this.$store.getters.user_favorites
    },
    loading () {
      return this.$store.getters.loading
    },
    users () {
      return this.$store.getters.users
    }
  },
  methods: {
    toggleFavorite (id) {
      this.$store.dispatch('toggleFavorite', id)
    },
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
    }
  },
  created () {
    this.$store.dispatch('checkForLocalFavorites')
  }
}
</script>

<style scoped>
.card-description {
  height: 100px !important;
}
.product-card:hover {
  cursor: default;
  box-shadow:
  0px 1px 1px -1px  rgba(0, 0, 0, 0.2),
  0px 1px 1px 1px   rgba(0, 0, 0, 0.14),
  0px 1px 1px 1px   rgba(0, 0, 0, 0.12) !important;
}

.favorite-star:hover {
  color: #C2AE95 !important;
}
.product-info-button a {
  color: rgba(255, 255, 255, 0);
}

</style>
