import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import app from './modules/app.js'
import login from './modules/login.js'
import common from './modules/common.js'
import infoDetail from './modules/infoDetail.js'
import permission from './modules/permission.js' // permission 名字和文件文件的名字要一样
export default new Vuex.Store({
    modules:{
       app,
       login,
       common,
       infoDetail,
       permission,
    }
})