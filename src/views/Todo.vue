<template>
    <v-container>
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
            >
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
</template>

<script>
export default {
  name: 'Todo',
  data () {
    return {
      d: 2,
      items: [],
      newItem: '',
      nameRules: [
        v => !!v || 'Укажите задачу',
        v => (v && v.length <= 30) || 'Длинна не должна превышать 30 символов'
      ]
    }
  },
  methods: {
    addItem () {
      if (this.$refs.form.validate()) {
        this.items.push({ selected: false, name: this.newItem })
        this.saveToLocal()
        this.newItem = ''
      }
    },
    deleteItem (i) {
      this.items.splice(i, 1)
      this.saveToLocal()
    },
    listChanged (item, i) {
      if (this.d % 2 === 0) {
        this.items[i].selected = !this.items[i].selected
        this.saveToLocal()
        console.log(this.items)
      }
      this.d++
    },
    saveToLocal () {
      localStorage.setItem('ToDoItems', JSON.stringify(this.items))// Точка монтирования
    }
  },
  created () {
    if (localStorage.getItem('ToDoItems')) {
      this.items = JSON.parse(localStorage.getItem('ToDoItems'))// Точка монтирования
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
