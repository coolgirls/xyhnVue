// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import axios from 'axios'
import flexible from 'lib-flexible'
import common from './assets/css/common.less'
import store from './store/index'
import VueAwesomeSwiper from 'vue-awesome-swiper'

Vue.use(Vuex)
Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false
Vue.prototype.axios= axios;
Vue.prototype.HOME='/api';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
 