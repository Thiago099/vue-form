import Vue from 'vue'

import 'bootstrap/dist/css/bootstrap.min.css';

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import http from './mixin/http.js'
Vue.mixin(http);

import global from './global/global.js'
Vue.mixin(global);

import { routes } from './route-controller';
const router = new VueRouter({
  routes,
  mode: 'history'
});

import App from './app.vue'
new Vue({
  el: '#app',
  render: h => h(App),
  router,
})
