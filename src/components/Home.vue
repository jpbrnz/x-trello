<template>
<div class="container">
  <div class="status mt-4">
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
