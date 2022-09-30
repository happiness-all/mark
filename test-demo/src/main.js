import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import RoleSelection from '../public/js/lib.umd.min'

console.log('RoleSelection', RoleSelection)

Vue.use(RoleSelection)

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
