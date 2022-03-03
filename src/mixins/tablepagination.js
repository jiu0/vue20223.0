
let tablepagination = {
    data(){
      return{
          currentPage:1,
          pageSize:2,
          total:50,
          pageSizes:[2, 20, 30, 40]
       }
    },
    created(){


    },
    mounted(){
      
    },
    methods:{
        handleSizeChange(val){
            this.tableConfig.requestData.data.pageSize = val;
            this.tableLoadData();
        },
        handleCurrentChange(){
            this.tableConfig.requestData.data.pageNumber = val;
            this.tableLoadData();
        }
    }
}

export default tablepagination;