import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import store from './store';
// import * as utils from './utils';
Vue.config.productionTip = false;

new Vue({
  store,
  vuetify,
  // utils,
  render: (h) => h(App)
}).$mount('#app');
