<template>
  <div >
  <v-alert
      v-if="alert"
      style="
      text-align: center;
      position: absolute;
      width: calc(100% - 32px);
      z-index: 20"
      :color="alertColor"
      class="ma-0 pr-6 d-none d-sm-flex"
      dark
      icon="mdi-alert-octagon"
      border="right"
      transition="scale-transition"
      prominent
    >
    {{message}} <v-btn class="ml-12" @click="closeAlert">закрыть</v-btn>
  </v-alert>
   <v-alert
    v-if="alert"
    style="
    text-align: center;
    position: absolute;
    width: calc(100% - 32px);
    z-index: 20"
    :color="alertColor"
    class="ma-0 pr-6 d-flex d-sm-none"
    dark
    border="right"
    prominent
  >
  {{message}} <v-btn class="mt-4 ml-5"  @click="closeAlert">закрыть</v-btn>
  </v-alert>
  <v-container class="ma-0">

      <v-layout row>
        <v-flex xs12>
          <v-row
            align="center"
            justify="center"
          >
            <v-col
              cols="12"
              sm="10"
              md="8"
              lg="6"
              class="ma-0"
            >
              <v-container class="display-3 pl-3 mt-0 pt-8 font-weight-thin d-none d-sm-flex">Список дел</v-container>
              <v-container class="display-1 pl-3 mb-0 pt-0 font-weight-thin d-flex d-sm-none">Список дел</v-container>
              <v-container class="subtitle-2 pl-3 mb-10  font-weight-thin">
                Выполнено: {{completed.length}} из {{items.length}}
              </v-container>
               <v-text-field
                ref="form"
                label="Добавить"
                color="dark"
                counter="30"
                v-model="newItem"
                :rules="nameRules"
                @keyup.enter = "addItem"
               ></v-text-field>
              <v-container id="list">
                <v-container
                  id="item-in-list"
                  v-for="(item, i) in items"
                  :key="i">
                  <v-row>
                    <v-checkbox
                      color="success"
                      v-model="item.selected"
                      :label="i+1 + '.  ' + item.name"
                      @click="listChanged(item, i)"
                    ></v-checkbox>
                    <v-spacer></v-spacer>
                    <div class="delbutton">
                      <v-icon
                        @click="deleteItem(i)"
                      >mdi-delete</v-icon>
                    </div>
                  </v-row>
                  <v-divider></v-divider>
                </v-container>
              </v-container>
            </v-col>
            </v-row>
        </v-flex>
      </v-layout>
    </v-container>
    </div>
</template>

<script>
export default {
  name: 'Todo',
  data () {
    return {
      message: '',
      counter: 2,
      alert: false,
      alertColor: 'success',
      items: [],
      newItem: '',
      nameRules: [
        v => !!v || 'Укажите задачу',
        v => (v && v.length <= 30) || 'Длинна не должна превышать 30 символов'
      ]
    }
  },
  computed: {
    completed () {
      var completed = []
      this.items.forEach(item => {
        if (item.selected === true) {
          completed.push(item)
        }
      })
      return completed
    }
  },
  methods: {
    addItem () {
      if (this.$refs.form.validate()) {
        this.items.push({ selected: false, name: this.newItem })
        this.saveToLocal()
        this.alertColor = 'success'
        this.newAlert('Добавлена задача: ' + this.newItem)
        this.newItem = ''
      }
    },
    deleteItem (i) {
      var delTask = this.items[i].name
      this.items.splice(i, 1)
      this.saveToLocal()
      this.alertColor = 'error'
      this.newAlert('Задача удалена: ' + delTask)
      this.newItem = ''
    },
    listChanged (item, i) {
      if (this.counter % 2 === 0) {
        this.items[i].selected = !this.items[i].selected
        this.saveToLocal()
        console.log(this.items)
      }
      this.counter++
    },
    saveToLocal () {
      localStorage.setItem('ToDoItems', JSON.stringify(this.items))
    },
    newAlert (message) {
      this.message = message
      this.alert = true
    },
    closeAlert () {
      this.alert = false
      this.message = ''
    }
  },
  created () {
    if (localStorage.getItem('ToDoItems')) {
      this.items = JSON.parse(localStorage.getItem('ToDoItems'))
    } else {
      this.items = [{
        selected: true,
        name: 'Зайти в приложение'
      },
      {
        selected: false,
        name: 'Посмотреть'
      },
      {
        selected: false,
        name: 'Оценить'
      }
      ]
    }
  }
}
</script>

<style scoped>
.v-application .accent--text {
  color: red !important;
}
.delbutton {
  margin-top: 18px;
}
</style>
