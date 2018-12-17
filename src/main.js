import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import store from './store'

Vue.use(BootstrapVue)

import VueRouter from 'vue-router'
//import VueResource from 'vue-resource'
//Vue.use(VueResource)
Vue.use(VueRouter)

import Home from './components/Home.vue'

//define route here
const routes = [{
    path: '/home',
    name: 'home',
    component: Home,
    alias: ''
}]

const router = new VueRouter({
    routes
})

new Vue({
  el: '#app',
  router,
  render: h => h(App),
  store
})
