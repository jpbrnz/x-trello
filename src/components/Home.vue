<template>
  <div class="container-fluid">
    <h6 class="text-center">
      <img src="../assets/logo.png" style="width: 70px"> <svg width="200px" height="200px" viewBox="0 0 200 200" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <title>trello-mark-blue-flat</title>
          <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="Logos" transform="translate(-1579.000000, -521.000000)">
                  <g id="Group" transform="translate(-9.000000, 1.000000)">
                      <g id="Trello-Logo" transform="translate(468.000000, 0.000000)">
                          <g id="Trello-Mark---Blue---Flat" transform="translate(1020.000000, 420.000000)">
                              <g id="Mark" transform="translate(100.000000, 100.000000)">
                                  <rect id="Board" fill="#0079BF" x="0" y="0" width="200" height="200" rx="25"></rect>
                                  <rect id="Right-List" fill="#FFFFFF" x="113" y="26" width="61" height="87.5" rx="12"></rect>
                                  <rect id="Left-List" fill="#FFFFFF" x="26" y="26" width="61" height="137.5" rx="12"></rect>
                              </g>
                          </g>
                      </g>
                  </g>
              </g>
          </g>
      </svg><br><small><b-badge class="small" variant="light">Trello client.js version {{ getTrelloVersion() }}</b-badge></small>
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
