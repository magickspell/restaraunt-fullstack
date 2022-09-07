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
          @click="createItem"
          class="btn-warning"
      >
        Создать
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
    return {
      name: '',
      selected: '',
      picture: {},
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    hidePopup() {
      this.$emit('update:show', false)
    },
    onChange(image) {
      console.log('New picture selected!')
      if (image) {
        console.log('Picture loaded.')
        this.picture = image
        console.log(`image`)
        console.log(image)
      } else {
        console.log('FileReader API not supported: use the <form>, Luke!')
      }
    },
    async createItem() {
      console.log(this.picture)
      if (
          this.selected !== ""
          &&
          this.name.length !== 0) {
        console.log(`inputs ok`)
        const q = await axios.post(`http://localhost:3000/item`, {
          title: this.name,
          categoryId: Number(this.selected),
          picture: this.picture
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
  }
}
</script>

<style>

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

.picture-input {
  height: 40px;
  background: white;
}

.picture-input > input[type=file] {
  display: block !important;
}
</style>