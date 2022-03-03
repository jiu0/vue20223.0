import { reactive,} from '@vue/composition-api'
export function pagination(){
   
  const pageData = reactive({
     currentPage:1,
     pageSize:2,
     total:50,
     pageSizes:[2, 20, 30, 40]
  })
  
  const totalCount = (val)=>{
    pageData.total = val
  }

  const handleSizeChange = (val)=>{
    pageData.pageSize = val
  }
  const handleCurrentChange = (val)=>{
    pageData.currentPage = val
  }
  return{
    pageData,
    handleSizeChange,
    handleCurrentChange,
    totalCount,
  }
}