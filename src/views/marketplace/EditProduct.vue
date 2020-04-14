<template>
     <v-container class="fill-height pa-0 ma-0" fluid >
      <v-row align="center" justify="center" >
        <v-col cols="12"  xs="5" sm="11" md="8" lg="6" class="pa-0 ma-0">
          <v-container v-if="userIsOwner" class="pl-10 pr-10 ma-0">
            <v-container class="display-3 pl-3 mb-10 pt-8 font-weight-thin d-none d-sm-flex">Редактировать</v-container>
            <v-container class="display-1 pl-3 mb-0 pt-0 font-weight-thin d-flex d-sm-none">Редактировать</v-container>
            <v-form
              ref="form"
              v-model="valid"
              :lazy-validation="lazy"
            >
              <v-text-field
                v-model='product.title'
                :counter="30"
                label="название"
                color="black"
                :rules="nameRules"
                requierd>
              </v-text-field>

              <v-text-field
                v-model='product.breed'
                :counter="30"
                label="порода"
                color="black"
                :rules="nameRules"
                requierd>
              </v-text-field>

              <v-textarea
                v-model='product.description'
                :counter="500"
                label="описание"
                background-color="rgb(245, 245, 245)"
                color="black"
                :rules="textRules"
                requierd>
              </v-textarea>

              <v-text-field
                v-model='product.price'
                :rules="priceRules"
                label="цена"
                color="black"
                type="number"
                step="1"
                style="width: 80px"
                requierd>
              </v-text-field>

              <v-file-input
                id="image-input"
                color="black"
                prepend-icon="mdi-camera"
                @change="loadImage"
                accept="image/*"
                show-size
                counter
                label="Фотография"
                requierd>

              </v-file-input>
              <v-layout>
                <v-img height="100px" width="100px" v-if="product.imageSrc" :src="product.imageSrc"></v-img>
                <v-spacer></v-spacer>
                  <v-btn
                    @click="editProduct"
                    :disabled="!valid || loading"
                    :loading="loading"
                    color="dark"
                    class="mt-6" >
                  отправить</v-btn>
              </v-layout>
            </v-form>
          </v-container>
          <v-container v-else>
            Только создатель объявления может его редактировать.
          </v-container>
       </v-col>
    </v-row>
  </v-container>
</template>

<script>
import * as fb from 'firebase'

export default {
  name: 'AddProduct',
  data () {
    return {
      newItem: {
        title: '',
        breed: '',
        description: '',
        price: 0,
        image: null
      },
      image: null,
      valid: true,
      lazy: false,
      priceRules: [
        v => !!v || 'Укажите кол-во',
        v => (v % 1) === 0 || 'Должно быть целым'
      ],
      nameRules: [
        v => !!v || 'Введите логин',
        v => (v && v.length <= 30) || 'Длинна не должна превышать 30 символов'
      ],
      textRules: [
        v => !!v || 'Введите логин',
        v => (v && v.length <= 500) || 'Длинна не должна превышать 500 символов'
      ]
    }
  },
  props: ['id'],
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    products () {
      return this.$store.getters.products
    },
    product () {
      return this.$store.getters.products.find(item => item.id === this.id)
    },
    userIsOwner () {
      return this.$store.getters.userIsOwner
    }
  },
  methods: {
    loadImage () {
      const target = document.getElementById('image-input')
      const file = target.files[0]
      const reader = new FileReader()
      reader.onload = e => {
        this.imageSrc = reader.result
      }
      reader.readAsDataURL(file)
      this.image = file
    },
    async getImageSrc () {
      const fileData = await fb.storage().ref(`products/${this.product.id}`).put(this.image)
      this.product.imageSrc = await fb.storage().ref().child(fileData.ref.fullPath).getDownloadURL()
    },
    async editProduct () {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('setLoading', true)
        if (this.image) {
          await this.getImageSrc()
        }
        await this.$store.dispatch('editProduct', this.product)
        this.$router.push('/marketplace/list/')
      }
    }
  },
  created () {
    this.$store.dispatch('userIsOwner', this.product)
  }
}
</script>
