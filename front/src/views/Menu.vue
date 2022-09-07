<template>
  <navbar :navPath="navPath"></navbar>
  <div class="menu">
    <div class="menu__list__btn d-flex justify-content-center align-items-center mx-auto mt-5"
         @click="showAddItemPopup"
    >
      Add Product
    </div>
    <ul class="menu__list d-flex w-75 mx-auto flex-wrap" v-if="!loading">

      <li class="menu__list__item m-4 mx-auto d-flex flex-column"
          v-for="item in items"
          @click="showChangeItemPopup(item)"
      >
        <img v-if="item.picture.length > 10" :alt="item.title" class="menu__list__item__img"
             :src="item.picture"
        >
        <img v-else src="../../public/notFound.jpg" alt="pizza" class="menu__list__item__img">
        <p><b>{{ item.title }}</b></p>
        <p>Категория: {{ item.categoryName }}</p>
      </li>
    </ul>
    <p class="loading" v-else><b>Loading...</b></p>
  </div>
  <add-popup v-model:show="addItemPopup"></add-popup>
  <change-popup
      v-model:show="changeItemPopup"
      v-model:id="changeItemPopupId"
      v-model:name="changeItemPopupName"
      v-model:selected="changeItemPopupSelected"
      v-model:file="changeItemPopupFile"
  ></change-popup>
</template>


<script>
import axios from 'axios';
import Navbar from "../components/Navbar";
import AddPopup from "../components/Popup";
import ChangePopup from "../components/ItemPopup"

export default {
  components: {
    Navbar,
    AddPopup,
    ChangePopup
  },
  data() {
    return {
      navPath: 'menu',
      loading: false,
      items: [],
      categories: [],
      addItemPopup: false,
      changeItemPopup: false,
      changeItemPopupId: 0,
      changeItemPopupName: '',
      changeItemPopupSelected: '',
      changeItemPopupFile: {},
    }
  },
  methods: {
    showAddItemPopup() {
      this.addItemPopup = true
    },
    showChangeItemPopup(e) {
      this.changeItemPopupName = e.title
      this.changeItemPopupSelected = String(e.categoryId)
      this.changeItemPopup = true
      this.changeItemPopupId = Number(e.id)
    },
    async fetchData() {
      try {
        this.loading = true
        const itemsR = await axios.get(`http://localhost:3000/items`)
        const categoriesR = await axios.get(`http://localhost:3000/categories`)
        let items = itemsR.data;
        let categories = categoriesR.data;
        items.map((i) => {
          for (let c in categories) {
            if (i.categoryId === categories[c].id) {
              return (
                  i.categoryName = categories[c].title
              )
            }
          }
        });
        this.categories = categories;
        this.items = items;
        console.log(this.items)
      } catch (e) {
        alert(e)
      } finally {
        this.loading = false
      }
    },
  },
  mounted() { //lifecycle when component mounted
    this.fetchData();
  }
}
</script>


<style scoped>
.loading {
  height: 100vh;
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 0 auto;
  font-size: 32px;
}

.menu__list {
  padding: 40px 0 100px;
}

.menu__list__item {
  width: 300px;
  margin: 8px auto;
  background: white;
  height: 300px;
  border-radius: 24px;
  cursor: pointer;
}

.menu__list__item > p {
  background: white;
  margin: 0;
  padding: 8px 0;
  text-align: center;
}

.menu__list__item > p > b {
  background: white;
  font-size: 22px;
}

.menu__list__item__img {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px auto 2px;
  height: auto;
  max-height: 160px;
  width: auto;
  max-width: 260px;
  min-width: 160px;
  background-repeat: no-repeat;
  background-size: auto;
}

.menu__list__btn {
  width: 300px;
  height: 50px;
  border: 2px solid black;
  background: white;
  cursor: pointer;
  border-radius: 10px;
  transition: 0.5s;
}

.menu__list__btn:hover {
  background: #fdfcdc;
  transform: scale(1.1);
}

img {
  height: 160px;
  margin-top: 20px;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  border-radius: 20px;
}
</style>