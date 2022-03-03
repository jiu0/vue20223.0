import { MessageBox } from 'element-ui';
import { ref } from '@vue/composition-api';
// vue3.0 定义的方法
export function global3(){
   const str = ref('');
   const confirm3 = (params) =>{
        MessageBox.confirm(params.content, params.tip || '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: params.type || 'warning',
            center:true
        }).then(() => {
            str.value = 'vue3.0定义的方法' || '';
            params.fn && params.fn(params.data.id,params.data.name) || '';
            //if(params.fn) { params.fn() }
        }).catch(() => {
            params.catchFn && params.catchFn() || '';
            // root.$message({
            //   type: 'info',
            //   message: '已取消删除'
            // });          
        });
   }
   return {
       str,
       confirm3,
   }
}