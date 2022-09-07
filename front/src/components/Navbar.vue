<template>
  <nav>
    <ul class="navbar__wrapper container-fluid mx-auto d-flex flex-row flex-wrap p-2 mb-0">
      <li
          class="navbar__wrapper__item col-md-6 d-flex align-items-center justify-content-center"
          :class="navPath === 'menu' ? 'selected' : ''"
          @click="$router.push('./menu')"
      >
        Menu
      </li>
      <li
          class="navbar__wrapper__item col-md-6 d-flex align-items-center justify-content-center"
          :class="navPath === 'info' ? 'selected' : ''"
          @click="$router.push('./info')"
      >
        Info
      </li>
    </ul>
  </nav>
</template>

<script>
/*let path = window.location.href.split('/')[window.location.href.split('/').length - 1]
console.log(path)*/

export default {
  props: {
    navPath: String,
  },
}
</script>

<style scoped>
* {
  background: #f07167;
}

.navbar__wrapper {
  list-style: none;
  height: 100px;
  color: white;
  font-size: 26px;
  position: fixed;
  bottom: 0;
}

.navbar__wrapper__item:hover {
  cursor: pointer;
}

.selected {
  color: #0081a7;
  border: 1px solid #fdfcdc;
  border-radius: 20px;
}
</style>