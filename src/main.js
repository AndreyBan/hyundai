import Vue from 'vue';
import App from './App.vue';
import vSelect from "vue-select";

Vue.config.productionTip = false

if (process.env.NODE_ENV === 'development'){
  Vue.prototype.$requestUrl = 'https://agat-hyundai.ru/ajax/api_instock.php';
} else {
  Vue.prototype.$requestUrl  = '/ajax/api_instock.php';
}

Vue.component("v-select", vSelect);
new Vue({
  render: h => h(App)
}).$mount('#app')


