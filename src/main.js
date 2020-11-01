import Vue from 'vue'
import axios from './config/axios'
import VueAxios from 'vue-axios'
import App from './App'
import router from './router/router'
import store from './store/store'
import './plugins/element/element.js'

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
