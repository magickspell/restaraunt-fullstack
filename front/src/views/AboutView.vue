<template>
  <navbar :navPath="navPath"></navbar>
  <div class="about-page container-fluid mx-auto">
    <h2 class="col-4 text-center">Info page</h2>
    <div class="about-page__content d-flex flex-wrap">
      <div class="about-page__content__wrapper col-md-6 text-center">
        <h4>frontend path:</h4>
        <ul>
          <li>Vue</li>
          <li>Bootstrap 4</li>
          <li>Axios</li>
        </ul>
      </div>
      <div class="about-page__content__wrapper col-md-6 text-center">
        <h4>backend path:</h4>
        <ul>
          <li>Node.js</li>
          <li>TypeScript</li>
          <li>Express.js</li>
          <li>PostgreSQL</li>
          <li>Prisma ORM</li>
        </ul>
      </div>
    </div>


  </div>
</template>

<script>
import Navbar from "../components/Navbar";

export default {
  components: {
    Navbar
  },
  data() {
    return {
      navPath: 'info'
    }
  }
}
</script>

<style scoped>
h2 {
  margin: 40px auto;
}

ul {
  list-style: none;
}

li {
}
</style>
