<template>
  <router-view/>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  data() {
    return {
      path: window.location.href.split('/')[window.location.href.split('/').length - 1]
    }
  },
  components: {
    Navbar
  }
}
</script>

<style>
@import'~bootstrap/dist/css/bootstrap.css';
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background: #fed9b7;
  min-width: 320px;
}
</style>
