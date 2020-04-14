
<template>
<v-app>
  <template v-if="error">
   <v-snackbar
      :multi-line="true"
      color="error"
      @input="closeError"
      :value="true"
      :timeout="3000"
    >
      {{ error }}
      <v-btn
        color="dark"
        text
        @click="closeError"
      >
        Close
      </v-btn>
    </v-snackbar>
  </template>
  <navbar>

  </navbar>
</v-app>
</template>

<script>
import navbar from './components/Navbar'

export default {
  name: 'App',
  data: () => ({
  }),
  components: {
    navbar
  },
  methods: {
    closeError () {
      this.$store.dispatch('clearError')
    }
  },
  computed: {
    error () {
      return this.$store.getters.error
    }
  }
}
</script>
