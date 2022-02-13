import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js';
import VueCompositionApi from '@vue/composition-api';

// 引入ElementUI
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
Vue.use(VueCompositionApi);

new Vue({
    router,
	render:h=>h(App)
}).$mount('#app')

