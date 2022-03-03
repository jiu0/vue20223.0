import { MessageBox } from 'element-ui';
export default {
   install(Vue,options) {
        // 注册全局方法
        Vue.prototype.confirm = (params)=>{
            MessageBox.confirm(params.content, params.tip || '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: params.type || 'warning',
                center:true
              }).then(() => {
                params.fn && params.fn(params.id);
                //if(params.fn) { params.fn() }
              }).catch(() => {
                // root.$message({
                //   type: 'info',
                //   message: '已取消删除'
                // });          
              });
         }
        //  Vue.prototype.xxxxx = ()=>{
        //     console.log('tttttt')
        //  }
    }
}