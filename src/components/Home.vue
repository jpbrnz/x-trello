<template>
<div class="container-fluid">
  <h6 class="text-center">
      <img src="../assets/logo.png" style="width: 100px"><br><small><b-badge class="small" variant="light">Trello client.js version {{ getTrelloVersion() }}</b-badge></small>
    </h6>
  <div class="status">
    <hr>
    <Login />
  </div>

  <Boards />
</div>
</template>
<script>
import Login from './Login.vue'
import Boards from './Boards.vue'
export default {
  name: 'home',
  components: {
    Login,
    Boards
  },
  methods: {
    /**
     * getTrelloVersion - trello version helper
     * @return String version of trello
     */
    getTrelloVersion() {
      return Trello.version()
    }
  }
}
</script>
<style lang="scss">
h6 {
    padding-top: 40px;
    svg {
        width: 50px;
        height: 50px;
    }
}
</style>
