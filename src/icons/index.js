import Vue from 'vue';
import SvgIcon from './SvgIcon';
Vue.component('svg-icon',SvgIcon)


/**
 * 遍历和读取svg文件目录中的所有svg文件
 * require.context(参数1,参数2,参数3) 参数1目录 参数2是否遍历目录子级，参数3读取规则
 */

 const req = require.context('./svg', false, /\.svg$/);
 const requireAll = requireContext => {
   // console.log(requireContext.keys().map(requireContext));
   return requireContext.keys().map(requireContext);
 }
 
 requireAll(req);