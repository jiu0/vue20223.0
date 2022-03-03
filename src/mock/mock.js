
import Mock from 'mockjs'
// 测试所用
Mock.mock("/userInfo","post",{
 'name': '@name',
  data:[
    {
      key: '1',
      name: 'jack',
      age: 32,
      address: '广东省广州市天河区',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'rose',
      age: 42,
      address: '湖南省长沙市芙蓉区',
      tags: ['loser'],
    },
  ]
})

Mock.mock("/list","get",{
    'xData|100':['@datetime'],
    'series|2':[{
        'name':'@NAME',
        'type':'line',
        'smooth':true,
        'data|100':['@integer(1,600)']
    }],
    data:[
        {name:'jack2',sex:'男'},
        {name:'rose2',sex:'女'},
    ]
 })

 // 一级分类添加
 Mock.mock("/news/addFirstCategery","post",{
    data:{
        category_name:'国际信息',
        //id:888,
        message:'添加成功',
        resCode:0
    }
})


 // 退出登录
 Mock.mock("/logout","post",{
  data:{
      data:null,
      message:'退出成功',
      resCode:0
  }
})


 // 子级分类添加
 Mock.mock("/news/addChildrenCategery","post",{
    data:{
        data:{
            category_name:'国际子级分类',
            id:9999
        },
        //id:888,
        message:'添加子级成功',
        resCode:0
    }
})


// 获取一级分类
Mock.mock("/news/getCategery","post",{
  data:[
       {
         id:'123',
         category_name:'一级累',
       },
       {
        id:'456',
        category_name:'一级累2',
      },
      {
        id:'789',
        category_name:'一级累3',
      },
     
    ]
})

// 获取所有分类(包含子级)
Mock.mock("/news/getCategeryAll","post",{
        data:[
            {
              id:'123',
              parentId:null,
              category_name:'一级累',
              children:[
                  {
                    id:"5",
                    category_name:'子类2',
                    parentId:'123',
                  },
                  {
                    id:"6",
                    category_name:'子类2',
                    parentId:'123',
                  },
              ]
            },
            {
             id:'456',
             category_name:'一级累2',
           },
           {
             id:'789',
             category_name:'一级累3',
           },
         ]
  })



// 删除一级分类成功
Mock.mock("/news/deleteCategery","post",{
    data:{
        data:null,
        message:'删除成功',
        resCode:0
     }
  })

// 修改一级分类成功
Mock.mock("/news/editCategery","post",{
    data:{
        data:{
            categoryName:'国际新消息'
        },
        message:'修改成功',
        resCode:0
     }
  })

// 新增表格数据
Mock.mock("/news/add","get",{
    data:{
        data:null,
        message:'添加成功',
        resCode:0
     }
  })


// 编辑表格数据
Mock.mock("/news/editInfo","post",{
    data:{
        data:null,
        message:'修改成功',
        resCode:0
     }
  })


// 获取上传图片的 token
Mock.mock("/uploadimgToken","post",{
    data:{
        data:{
            token:'49506jfd0gfdgtretgb9bvjer09fb95tj'
        },
        message:'获取token成功',
        resCode:0
     }
  })

// 上传图片成功
Mock.mock("/uploadImg","post",{
    data:{
        data:{
            img:'src/assets/logo.png'
        },
        message:'获取成功',
        resCode:0
     }
  })

// 表格列表数据 
Mock.mock("/news/getList","post",{
  'name': '@name',
   data:{
        data:[
            {
                id:"123",
                title:'111111',
                category:'kkkkk',
                date: '777777777',
                user: 'infoSystem',
                imgUrl:'http://r7ndx2ysi.hn-bkt.clouddn.com/g3.jpg'
            },
            {
                id:"456",
                title:'2222222',
                category:'kkkkk',
                date: '99999999',
                user: 'userSystem',
                imgUrl:'http://r7ndx2ysi.hn-bkt.clouddn.com/g1.jpg'
            },
        ],
        total:16,
        message:"ok",
        resCode:0
   }
})

// 删除表格数据
Mock.mock("/news/deleteinfo","post",{
    data:{
        data:['123'],
        message:'删除成功',
        resCode:0
     }
  })


// 获取省  
Mock.mock("/cityPicker","post",{
  'name': '@name',
   data:{
        data:[
            {
              PROVINCE_CODE:"1110000",
              PROVINCE_ID:"1",
              PROVINCE_NAME:"湖北",
              data:{
                 data:[
                    {
                      CITY_CODE:"4441000",
                      CITY_ID:"2",
                      CITY_NAME:"咸宁",
                      data:{
                        data:[
                          {
                            AREA_CODE:"222000",
                            AREA_ID:"12",
                            AREA_NAME:"崇阳",
                            data:{
                              data:[
                                {
                                  STREET_CODE:"333111",
                                  STREET_ID:"44",
                                  STREET_NAME:"桃溪大道",
                                },
                                {
                                  STREET_CODE:"333222",
                                  STREET_ID:"66",
                                  STREET_NAME:"桃溪大道2",
                                },
                              ],
                              message:"ok",
                              resCode:0
                            }
                          },
                          {
                            AREA_CODE:"222111",
                            AREA_ID:"23",
                            AREA_NAME:"通城",
                          },
                        ],
                        message:"ok",
                        resCode:0
                      }
                    },
                    {
                      CITY_CODE:"4442000",
                      CITY_ID:"3",
                      CITY_NAME:"武汉"
                    },
                   ],
                 message:"ok",
                 resCode:0
              }
            },
            {
              PROVINCE_CODE:"111003",
              PROVINCE_ID:"2",
              PROVINCE_NAME:"天津"
            },
            {
              PROVINCE_CODE:"111004",
              PROVINCE_ID:"3",
              PROVINCE_NAME:"北京"
            },
        ],
        message:"ok",
        resCode:0
   }
})


// 获取用户角色 
Mock.mock("/role","post",{
   data:{
        data:[
            {
                id:"1",
                name:'业务员',
                role:'sale'
            },
            {
               id:"2",
               name:'技术员',
               role:'technician'
            },
            {
              id:"3",
              name:'部门经理',
              role:'manager'
           },
        ],
        message:"ok",
        resCode:0
   }
})

// 获取系统角色 
Mock.mock("/system","post",{
  data:{
       data:[
           {
               id:"155",
               name:'信息功能',
               role:'infoSystem'
           },
           {
              id:"55",
              name:'用户功能',
              role:'userSystem'
           },
       ],
       message:"ok",
       resCode:0
  }
})

// 获取系统角色 
Mock.mock("/systemRole","post",{
  data:{
       data:{
           data:['infoSystem','userSystem','admin'],
           //role:['admin'],
           button:['info.edit','info.delete'],
           btnPerm:[
              // 信息列表
             'info.edit','info.add','info.search','info.batchDel','info.detailed','info.del',
             // 用户列表
             'user.search','user.add','user.edit','user.del','user.batchDel','info.firstCategoryAdd'
          ],
       },
       message:"ok",
       resCode:0
   }
})

// 获取用户角色 
Mock.mock("/userRole","post",{
  data:{
        data:{
            data:['sale','technician','manager'],
            button:['info.edit','info.delete'],
            btnPerm:[
              // 信息列表
             'info.edit','info.add','info.search','info.batchDel','info.detailed','info.del',
             // 用户列表
             'user.search','user.add','user.edit','user.del','user.batchDel','info.firstCategoryAdd'
          ],
        },
        message:"ok",
        resCode:0
   }
})



// 获取按钮权限
Mock.mock("/permButton","post",{
  data:{
       data:[
           {
               name:'信息管理',
               perm:[
                  {  name:'搜索按钮', value:'info.search'  },
                  {  name:'添加信息按钮', value:'info.add'  },
                  {  name:'编辑按钮',   value:'info.edit'  },
                  {  name:'删除按钮',  value:'info.del' },
                  {  name:'详情按钮',  value:'info.detailed' },  
                  {  name:'批量删除按钮',  value:'info.batchDel' },   
              ]
           },
           {
            name:'信息分类',
            perm:[
               {
                  name:'添加一级分类按钮',
                  value:'info.firstCategoryAdd'
               },
             ]
           },
           {
            name:'用户列表',
            perm:[
               { name:'搜索按钮',  value:'user.search'},
               { name:'添加按钮',  value:'user.add'  },
               {  name:'编辑按钮',   value:'user.edit'  },
               {  name:'删除按钮',  value:'user.del' },  
               {  name:'批量删除按钮',  value:'user.batchDel' },   
             ]
           },
       ],
       message:"获取成功",
       resCode:0
  }
})




// 新增用户弹框
Mock.mock("/user/add","post",{
  data:{
       data:null,
       message:"添加成功",
       resCode:0
  }
})

// 用户列表 表格数据 
Mock.mock("/user/getList","post",{
   data:{
        data:[
            {
                id:"336",
                phone:'18289989000',
                region:'{"provinceValue":"1110000","cityValue":"4441000","areaValue":"222000","streetValue":"333111"}',
                role: 'infoSystem,userSystem',    // 系统角色
                role2:'sale,technician,manager',  // 用户角色
                status: '2',
                truename:'yyy',
                username:'1250837811@qq.com',
                btnPerm:'info.add,info.edit,user.search,user.add,info.detailed,info.del,info.batchDel',
            },
            {
              id:"338",
              phone:'18289989077',
              region:'{"provinceValue":"1110001","cityValue":"4441002","areaValue":"222003","streetValue":"333114"}',
              role: 'userSystem',       // 系统角色
              role2:'sale,technician',  // 用户角色
              status: '1',
              truename:'yyy666',
              username:'1250837812@qq.com',
              btnPerm:'info.add,info.edit,user.search,user.add,user.batchDel',
          },
        ],
        total:16,
        message:"ok",
        resCode:0
   }
})

// 批量删除用户列表  单个删除
Mock.mock("/user/delete","post",{
  data:{
       data:['336'],
       message:"删除成功",
       resCode:0
  }
})


// 是否启用 禁用
Mock.mock("/user/actives","post",{
  data:{
       data:null,
       message:"修改成功",
       resCode:0
  }
})


// 用户表格数据编辑
Mock.mock("/user/edit","post",{
  data:{
      data:null,
      message:'修改成功',
      resCode:0
   }
})