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
          <v-toolbar-title color="black">Регистрация</v-toolbar-title>
          <v-spacer />
        </v-toolbar>
        <v-card-text>
          <v-form
            ref="form"
            v-model="valid"
            :lazy-validation="lazy"
          >
            <v-text-field
              label="Имя пользователя"
              name="name"
              prepend-icon="mdi-account"
              type="text"
              color="dark"
              v-model="name"
              :rules="nameRules"
              :counter="15"
              required
            />

           <v-text-field
              id="e-mail"
              label="E-mail"
              name="e-mail"
              prepend-icon="mdi-email"
              type="e-mail"
              color="dark"
              v-model="email"
              :rules="emailRules"
              required
              :counter="30"
            />

            <v-text-field
              id="password"
              label="пароль"
              name="password"
              prepend-icon="mdi-lock"
              type="password"
              color="dark"
              v-model="password"
              :rules="passwordRules"
              :counter="20"
              required
            />

            <v-text-field
              id="password-repeat"
              label="повторите пароль"
              name="password"
              prepend-icon="mdi-lock-question"
              type="password"
              color="dark"
              v-model="password_repeat"
              :rules="password_repeatRules"
              :counter="20"
              required
            />

          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="onSubmit" :disabled="!valid || loading" :loading="loading" color="dark">Зарегистрироваться</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Введите логин',
        v => (v && v.length <= 15) || 'Длинна не должна превышать 15 символов'
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Введите пароль',
        v => (v && v.length <= 20) || 'Длинна пароля не должна превышать 20 символов'
      ],
      password_repeat: '',
      password_repeatRules: [
        v => !!v || 'Введите праоль',
        v => (v && v === this.password) || 'Пароли не соответствуют'
      ],
      email: '',
      emailRules: [
        v => !!v || 'Введите E-mail',
        v => /.+@.+\..+/.test(v) || 'Некорректный E-mail'
      ],
      lazy: false
    }
  },
  methods: {
    onSubmit () {
      if (this.$refs.form.validate()) {
        const user = {
          name: this.name,
          email: this.email,
          password: this.password
        }
        this.$store.dispatch('registerUser', user)
          .then(() => {
            this.$store.dispatch('fetchUserProducts')
            this.$router.push('/')
          })
          .catch(() => {})
      }
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
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    cartIsOpen () {
      return this.$store.getters.cartIsOpen
    }
  }
}
</script>
