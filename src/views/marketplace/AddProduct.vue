<template>
     <v-container class="fill-height pa-0 ma-0" fluid >
      <v-row align="center" justify="center" >
        <v-col cols="12"  xs="5" sm="11" md="8" lg="6" class="pa-0 ma-0">
          <v-container class="pl-10 pr-10 ma-0">
            <v-container class="display-3 pl-3 mb-10 pt-8 font-weight-thin d-none d-sm-flex">Добавить товар</v-container>
            <v-container class="display-1 pl-3 mb-0 pt-0 font-weight-thin d-flex d-sm-none">Добавить товар</v-container>
            <v-form
              ref="form"
              v-model="valid"
              :lazy-validation="lazy"
            >
              <v-text-field
                v-model='newItem.title'
                :counter="30"
                label="название"
                color="black"
                :rules="nameRules"
                requierd>
              </v-text-field>

              <v-text-field
                v-model='newItem.breed'
                :counter="30"
                label="порода"
                color="black"
                :rules="nameRules"
                requierd>
              </v-text-field>

              <v-textarea
                v-model='newItem.description'
                :counter="500"
                label="описание"
                :rules="textRules"
                background-color="rgb(245, 245, 245)"
                color="black"
                requierd>
              </v-textarea>

              <v-text-field
                v-model='newItem.price'
                :rules="priceRules"
                label="цена"
                color="black"
                type="number"
                step="1"
                style="width: 80px"
                value="0"
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
                <v-img height="100px" width="100px" v-if="imageSrc" :src="imageSrc"></v-img>
                <v-spacer></v-spacer>
                  <v-btn
                    @click="createNewItem"
                    :disabled="!valid || loading"
                    :loading="loading"
                    color="dark"
                    class="mt-6" >
                    отправить</v-btn>
              </v-layout>
            </v-form>
          </v-container>
       </v-col>
    </v-row>
  </v-container>
</template>

<script>
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
      imageSrc: '',
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
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    createNewItem () {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('addProduct', this.newItem)
          .then(() => {
            this.$store.dispatch('fetchUserProducts')
            this.$router.push('/marketplace/list/')
          })
          .catch(() => {
          })
      }
    },
    loadImage () {
      const target = document.getElementById('image-input')
      const file = target.files[0]
      const reader = new FileReader()
      reader.onload = e => {
        this.imageSrc = reader.result
      }
      reader.readAsDataURL(file)
      this.newItem.image = file
    }
  }
}
</script>
