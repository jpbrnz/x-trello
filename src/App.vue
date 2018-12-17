<template>
<div id="app" class="wrap">
  <b-navbar toggleable="md" type="light" variant="light" fixed="top">
    <b-navbar-toggle v-if="$store.state.loggedIn" target="nav_collapse"></b-navbar-toggle>
    <b-navbar-nav class="ml-auto">
      <b-nav-item v-if="$store.state.loggedIn" :href="'https://trello.com/'+ $store.state.member.username" target="_blank" v-cloak>
        Welcome:&nbsp;&nbsp;<b><b-img rounded="circle" v-bind:src="'https://trello-avatars.s3.amazonaws.com/' + $store.state.member.avatarHash +'/30.png'"/> {{ $store.state.member.fullName }}</b>
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
[v-cloak] > * {
    display: none;
}
[v-cloak]::before {
    content: "loading...";
}
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
.ei {
    font-style: normal;
    font-variant: normal;
    font-weight: normal;
    line-height: 1;
    vertical-align: middle;
}
</style>
