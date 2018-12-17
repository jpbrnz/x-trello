<template>
<div id="app" class="wrap">
  <b-navbar toggleable="md" type="dark" variant="dark" fixed="top">
    <b-navbar-toggle v-if="$store.state.loggedIn" target="nav_collapse"></b-navbar-toggle>
    <b-navbar-brand href="#"><svg width="200px" height="200px" viewBox="0 0 200 200" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
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
    </svg></b-navbar-brand>
    <b-navbar-nav class="ml-auto">
      <b-nav-item v-if="$store.state.loggedIn">
        Welcome:&nbsp;&nbsp;<b><b-img rounded="circle" v-bind:src="'https://trello-avatars.s3.amazonaws.com/' + $store.state.member.avatarHash +'/30.png'" v-cloak/> {{ $store.state.member.fullName }}</b>
      </b-nav-item>
    </b-navbar-nav>
    <b-collapse v-if="$store.state.loggedIn" is-nav id="nav_collapse">
      <b-navbar-nav class="ml-auto">
        <b-nav-item v-on:click="createPDF">Export to PDF</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
  <div class="container">
    <keep-alive include="Home" exlude="Boards,ModalAddCard">
      <router-view></router-view>
    </keep-alive>
  </div>
</div>
</template>

<script>
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export default {
  name: 'app',
  props: ['Trello'],
  created() {
    console.log('app created');
  },
  mounted() {
    console.log('app mounted');
  },
  methods: {
    createPDF() {
      var somename = this.$store.state.member.fullName;

      html2canvas(document.getElementById("boardContainer"))
        .then(function(canvas) {
          var imgWidth = 210;
          var pageHeight = 295;
          var imgHeight = canvas.height * imgWidth / canvas.width;
          var heightLeft = imgHeight;
          var doc = new jsPDF('p', 'mm');
          var position = 0;

          var imgData = canvas.toDataURL('image/png');

          doc.text(somename);
          doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;

          while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            doc.addPage();
            doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
          }
          doc.save('file.pdf');


        });
    } //createPDF
  }
}
</script>

<style lang="scss">
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
}

h1,
h2 {
    font-weight: normal;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    transition: color 1s ease;
    color: #28a745;
    &:hover {
        color: #1e7e34;
    }
}
.navbar-brand {
    svg {
        width: 30px;
        height: auto;
    }
}
</style>
