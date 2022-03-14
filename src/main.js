import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vSelect from "vue-select";
import VueMeta from 'vue-meta'

Vue.config.productionTip = false

Vue.use(VueMeta, {
  refreshOnceOnNavigation: true
})

Vue.component("v-select", vSelect);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

if (process.env.NODE_ENV === 'development'){
  window.startRequestUrl = 'https://agat-hyundai.ru/ajax/api_instock.php';
} else {
  window.startRequestUrl = '/ajax/api_instock.php';
}
