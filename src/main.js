//import Vue from 'vue'  // == import Vue from 'vue/dist/vue.runtime.common.js';
import Vue from 'vue';
import App from './App.vue'
import router from './router/index.js';
//import store from "./store";  
import store from "./store/index.js";  // 这样引入是vuex 加了 modules 
import VueCompositionApi from '@vue/composition-api';

// 引入ElementUI
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
Vue.use(VueCompositionApi);

// 引入按钮权限  全局方法
import { buttonPermission} from './utils/buttonPermission'
Vue.prototype.btnPerm = buttonPermission

// 自定义指令按钮权限
import './utils/buttonPerm'
// 自定义全局方法
import global from '@/utils/global.js'
Vue.use(global);


// 引入图标
import './icons'
import './router/premit'
// 引入mock 数据
require("./mock/mock.js");

new Vue({
    router,
    store,
	render:h=>h(App)
}).$mount('#app')

