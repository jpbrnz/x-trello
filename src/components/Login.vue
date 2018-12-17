<template>
<div class="loginHeader">
  <div class="text-left" v-if="$store.state.loggedIn">
  </div>
  <div class="text-center" v-else>
    <svg width="200px" height="200px" id="trello-logo" viewBox="0 0 200 200" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
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
      </svg> <img src="../assets/logo.png" style="width:100%;max-width: 100px;">
    <hr class="w-50">
    <button class="btn btn-success" v-on:click="loginTrello">Login to Trello</button>
  </div>
</div>
</template>

<script>
export default {
  name: 'Login',

  methods: {

    authenticationSuccess: function() {
      console.log('Authenticated!');
      this.$store.commit('changeLoginStatus', 1)
      this.$store.dispatch('loadMemberData')
    },

    authenticationFailure: function() {
      console.log('Authentication error!');
      this.$store.commit('changeLoginStatus', 0)
    },

    loginTrello: function() {
      window.Trello.authorize({
        type: 'popup',
        name: 'Xello',
        scope: {
          read: 'true',
          write: 'true'
        },
        expiration: 'never',
        success: this.authenticationSuccess,
        error: this.authenticationFailure
      });
    }



  }
}
</script>
<style lang="scss">
#trello-logo {
    width: 100%;
    max-width: 50px;
    height: auto;
}
</style>
