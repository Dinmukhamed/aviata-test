import Vue from 'vue'
import App from './App.vue'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import VTooltip from 'v-tooltip'

Vue.config.productionTip = false;

const moment = require('moment');
require('moment/locale/ru');

Vue.use(require('vue-moment'), {
  moment
});

Vue.use(VTooltip);

new Vue({
  render: h => h(App),
}).$mount('#app')
