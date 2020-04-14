<template>

  <v-container
  class="fill-height"
  fluid
>
  <v-row
    align="center"
    justify="center"
  >
    <v-col
      cols="12"
      sm="8"
      md="6"
    >
      <v-card  class="elevation-12">
        <v-toolbar
          color="#C2AE95"
          flat
        >
          <v-toolbar-title color="black">Авторизация</v-toolbar-title>
          <v-spacer />
        </v-toolbar>
        <v-card-text>
          <v-form
          ref="form"
          v-model="valid"
          :lazy-validation="lazy"
          >
            <v-text-field
              label="E-mail"
              name="login"
              prepend-icon="mdi-email"
              type="text"
              color="dark"
              v-model="email"
              :rules="emailRules"
              :counter="30"
              required
            />

            <v-text-field
              id="password"
              label="пароль"
              name="password"
              prepend-icon="mdi-lock"
              type="password"
              color="dark"
              v-model="password"
              :counter="20"
              :rules="passwordRules"
              required
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />

          <v-btn @click="onSubmit" :loading="loading" :disabled="!valid || loading" color="dark">Войти</v-btn>

        </v-card-actions>
        <v-layout>
        <v-container class="title font-weight-thin">Войти через:
        <v-icon class="pl-5" @click="loginGoogle">mdi-google</v-icon>
        </v-container>
        <router-link class="invisible-link title font-weight-thin" to="/register" >
        <v-btn  x-small class="mr-2 mt-5 elevation-2" color="dark">Регистрация</v-btn>
        </router-link>
        </v-layout>
      </v-card>
    </v-col>
  </v-row>

</v-container>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      valid: true,
      email: '',
      emailRules: [
        v => !!v || 'Введите E-mail',
        v => /.+@.+\..+/.test(v) || 'Некорректный E-mail'
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Введите пароль',
        v => (v && v.length <= 20) || 'Длинна пароля не должна превышать 20 символов'
      ],
      lazy: false
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    cartIsOpen () {
      return this.$store.getters.cartIsOpen
    }
  },
  methods: {
    onSubmit () {
      if (this.$refs.form.validate()) {
        const user = {
          email: this.email,
          password: this.password
        }
        this.$store.dispatch('loginUser', user)
          .then(() => {
            this.$router.push('/')
          })
          .catch(() => {})
      }
    },
    loginGoogle () {
      this.$store.dispatch('loginGoogle')
        .then(() => {
          this.$router.push('/')
        })
        .catch(() => {})
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
    if (this.cartIsOpen) {
      this.switchCart()
    }
  }
}
</script>
<style scoped>
.invisible-link {
  color: rgba(255, 255, 255, 0);
}

</style>
