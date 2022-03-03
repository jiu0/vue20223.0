import { requestUrl } from '@/api/requestUrl.js';  //  requestUrl 这个名字不能改
import { loadTableData } from '@/api/common'
let tableLoadData = {
    data(){
      return{
         
        }
    },
    created(){


    },
    mounted(){
        this.tableLoadData()
    },
    methods:{
        tableLoadData(params){
            let requestJson = this.tableConfig.requestData;
            let resUrl = requestJson.url;
            let requestUserData = {
                  url:requestUrl[resUrl],
                  method:requestJson.method,
                  data:requestJson.data,
              }
              loadTableData(requestUserData).then(res=>{
                 let responseData = res.data.data.data;
                 console.log('res',res)
                 // 表格数据
                 this.tableData = responseData
                 // 总页数
                 this.total = res.data.data.total;
                //  this.item = responseData
                //  this.total = res.data.data.total;

              }).catch(err=>{
        
              })
           }
    }
}

export default tableLoadData;