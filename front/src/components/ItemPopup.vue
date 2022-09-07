<template>
  <div
      class="popup__wrapper d-flex align-items-center justify-content-center"
      v-if="show"
      @click.stop="hidePopup"
  >
    <div
        @click.stop
        class="popup__wrapper__dialog d-flex flex-column p-5"
    >
      <input @click.stop
             type="text"
             placeholder="Наименование"
             class="m-2"
             v-model="name"
      >
      <select
          @click.stop
          name="category"
          id=""
          class="m-2"
          v-model="selected"
      >
        <option @click.stop value="" disabled selected>Категория</option>
        <option @click.stop value="1">Обычная</option>
        <option @click.stop value="2">Сладкая</option>
        <option @click.stop value="3">Острая</option>
      </select>
      <picture-input
          @click.stop
          ref="pictureInput"
          accept="image/jpeg,image/png"
          @change="onChange">
      </picture-input>
      <button
          @click="updateItem"
          class="btn-warning"
      >
        Изменить
      </button>
      <button
          @click="deleteItem"
          class="btn-danger"
      >
        Удалить
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import PictureInput from 'vue-picture-input';

export default {
  components: {
    PictureInput
  },
  data() {
    return {}
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    id: {
      type: Number,
      default: 0,
    },
    name: {
      type: String,
      default: '',
    },
    selected: {
      type: String,
      default: '',
    },
    file: {
      type: Object,
      default: {}
    },
  },
  methods: {
    hidePopup() {
      this.$emit('update:show', false)
    },
    onChange(image) {
      console.log('New picture selected!')
      if (image) {
        this.picture = image
      } else {
        console.log('something wrong!')
      }
    },
    async updateItem() {
      if (
          this.selected !== ""
          &&
          this.name.length !== 0) {
        const q = await axios.put(`http://localhost:3000/item/${this.id}`, {
          title: this.name,
          categoryId: Number(this.selected),
          picture: (this.picture !== 'null' && this.picture) ? this.picture : []
        })
            .then((res) => {
              if (res.status === 200) {
                window.location.reload() // to re-fetch data
              }
            })
            .catch((e) => {
              alert(e)
            })
      } else {
        alert(`Fill inputs!`)
      }
    },
    async deleteItem() {
      if (
          this.selected !== ""
          &&
          this.name.length !== 0
          &&
          this.file !== ''
      ) {
        const q = await axios.delete(`http://localhost:3000/item/${this.id}`)
            .then((res) => {
              if (res.status === 200) {
                window.location.reload() // to re-fetch data
              }
            })
            .catch((e) => {
              alert(e)
            })
      } else {
        alert(`Fill inputs!`)
      }
    },
  }
}
</script>

<style scoped>

.popup__wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
}

.popup__wrapper__dialog {
  border-radius: 20px;
  background: white;
}

input,
select,
option {
  background: white;
}

</style>