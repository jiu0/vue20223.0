<template>
    <!-- 新增弹框-->
    <el-dialog :title="data.editTip ===1 ?'修改': '新增' " :visible.sync="data.dialog_info_flag" @close="close" @open="openDialog" width="580px">
        <el-form :model="data.form" ref="addForm" :rules="data.rules">
             <el-form-item label="用户名" :label-width="data.formLabelWidth" prop="username">
               <el-input v-model="data.form.username" autocomplete="off" placeholder="请输入邮箱"></el-input>
            </el-form-item>
            <el-form-item label="密码" :label-width="data.formLabelWidth" prop="password">
                <el-input type="password" v-model="data.form.password" autocomplete="off" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label="姓名" :label-width="data.formLabelWidth" prop="truename">
                <el-input v-model="data.form.truename" autocomplete="off" placeholder="请输入真实姓名"></el-input>
            </el-form-item>
            <el-form-item label="手机号" :label-width="data.formLabelWidth" prop="phone">
                 <el-input v-model.number="data.form.phone" autocomplete="off" placeholder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item label="地区" :label-width="data.formLabelWidth" prop="region">
                <CityPicker :cityPickerLevel="['province','city','area','street']" :cityPickerData.sync="data.cityPickerData"/>
            </el-form-item>
            <el-form-item label="是否禁用" :label-width="data.formLabelWidth" prop="status">
                  <el-radio v-model="data.form.status" label="1">启用</el-radio>
                  <el-radio v-model="data.form.status" label="2">禁用</el-radio>
            </el-form-item>
            <!-- <el-form-item label="系统" :label-width="data.formLabelWidth" prop="role"> -->
            <el-form-item label="角色" :label-width="data.formLabelWidth" prop="role">
                 <el-checkbox-group v-model="data.form.role">
                    <el-checkbox v-for="item in data.roleItem" :key="item.id" :label="item.role">{{item.name}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
             <el-form-item label="按钮权限" :label-width="data.formLabelWidth" prop="btnPerm">
                 <template v-if="data.btnPermiss.length > 0">
                    <div v-for="item in data.btnPermiss" :key="item.id">
                       <h4>{{item.name}}</h4>
                       <template v-if="item.perm && item.perm.length>0">
                            <el-checkbox-group v-model="data.form.btnPerm">
                                <el-checkbox v-for="buttons in item.perm" :key="buttons.value" :label="buttons.value">{{buttons.name}}</el-checkbox>
                            </el-checkbox-group>
                      </template>
                  </div>
                 </template>
            </el-form-item>
        </el-form> 
        <div slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" :loading="data.submitLoading" @click="submit('addForm')">确 定</el-button>
        </div>      
    </el-dialog>
</template>
<script>
import sha1 from 'js-sha1';
import { onBeforeMount, onMounted, reactive, ref,watch} from '@vue/composition-api';
import CityPicker from 'components/CityPicker/index';
import { GetRole,UserAdd,UserEdit,GetSystem,GetPermButton,} from '@/api/user.js';
import EventBus from '@/utils/bus'
import { stripscript,validateEmail,validatePass, } from '@/utils/validate.js'
export default{
    name:'dialoginfo',
    components:{ CityPicker },
    // 单向数据流 父级 -- 子级  不能反向修改
    props:{
        flag:{
            type:Boolean,
            default:false,
        },
         editData:{
            type:Object,
            default:()=>{}
        },
    }, 
    setup(props,{root,emit,refs}){
       let validateUsername = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else if(validateEmail(value)){
          //refs.addForm.validateField('username') callback()  //  对部分表单验证
          callback(new Error('用户格式有误'));
        }else{
          callback();  // true
        }
      };
      // 验证密码
      let validatePassword = (rule, value, callback) => {
        /*
         // 业务逻辑 
          1 编辑状态 
            需要校验 data.form.id 存在并且 密码不为空
            不需要校验 data.from.id 存在 并且密码为空
          2 添加状态 需要校验 data.form.id 不存在
        */
        if(data.form.id && !value){
            callback();
        }
        //console.log('form',data.form.id)
        if((data.form.id && value) || !data.form.id){
            // 过滤特殊字符  
            if(value){
            data.form.password = stripscript(value);
            value = data.form.password;
            }
            if (value === '') {
            callback(new Error('请输入密码'));
            } else if (validatePass(value)) {
            callback(new Error('密码为6到20位的数字+字母'));
            } else {
            callback();
            }
         }
      };
      // 验证角色
      let validateRole= (rule, value, callback) => {
        if (value.length === 0) {
          callback(new Error('请输入选择角色'));
        } else {
          callback();
        }
      };
       watch(()=>root.$store.state.common.name,(newV)=>{
              //console.log('newV',newV)
       })
       // 注册方法
       EventBus.$on('showFun',(data)=>{
           //console.log('data',data)  // {name:'123'}
       })  
       const data = reactive({
          // 城市数据
          cityPickerData:{},
          // 角色数据
          roleItem:[],
          // 按钮权限
          btnPermiss:[],
          dialog_info_flag:false,
          formLabelWidth:'80px',
          // 储存编辑按钮的记号
          editTip:'',
          form:{
              username:'',
              password:'',
              truename:'',
              phone:'',
              region:{},
              status:'1',    // 是否启用
              role:[],        // 角色
              btnPerm:[]      // 按钮权限
          },
          rules:reactive({
            username: [
                { validator: validateUsername, trigger: 'blur' }
            ],
            password: [
                { validator: validatePassword, trigger: 'blur' }
            ],
            role: [
                { validator: validateRole, trigger: 'change' }
            ],
            // role: [
            //     { required: true,message:'请选择角色', trigger: 'change' }
            // ],
         }), 
         submitLoading:false,
       })
       // 请求角色
       const getRole = ()=>{
          // 有数据了就不要再请求接口了
          //if(data.roleItem.length > 0 && data.btnPermiss.length > 0){  return false}
          if(data.roleItem.length===0){
             // 获取系统角色
            //const getSystem = ()=>{ 
            GetRole().then(res=>{  
            // GetSystem().then(res=>{
                 data.roleItem = res.data.data.data;
               }).catch(err=>{
            })
          }
          if(data.btnPermiss.length ===0){
               GetPermButton().then(res=>{
                   data.btnPermiss = res.data.data.data;
              }).catch(err=>{
             })
          }
       }
       //console.log('editData',props.editData)
       // 窗口打开回调接口
       const openDialog = ()=>{
           getRole()
           // 获取系统角色
           //getSystem()
           let editData = props.editData
        //    if(editData && editData.id){ // 编辑
        //             if(typeof(editData.role) === 'string'){
        //                editData.role = editData.role.split(',')    // 字符串转数组
        //             }else{
        //                editData.role = []
        //             }
        //             if(typeof(editData.btnPerm) === 'string'){
        //                editData.btnPerm = editData.btnPerm.split(',')    // 字符串转数组
        //             }else{
        //                editData.btnPerm = []
        //             }
        //         for(let key in editData){
        //             if(editData.editStatus){
        //                data.form[key] = editData[key]
        //             }
        //         }
        //     }else{
        //        for(let key in data.form){
        //             console.log('key',data.form[key])
        //             data.form[key] = ''
        //         }
        //     }
           //if(editData&&editData.id){  // 编辑
           if(editData&&editData.editStatus===1){
               if(typeof(editData.role) === 'string'){
                  editData.role = editData.role.split(',')  // 字符串转数组
               }
               if(typeof(editData.btnPerm) === 'string'){
                  editData.btnPerm = editData.btnPerm.split(',')  // 字符串转数组
               }
           // 循坏json 对象  从父组件传数据过来渲染到弹框里面 
           for(let key in editData){
               data.form[key] = editData[key] 
             }
           }else{  // 新增   新增 编辑 都有 id  判断不出来
                //data.form.id && delete data.form.id
                data.form.username = '',
                data.form.password= '',
                data.form.truename= '',
                data.form.phone= '',
                data.form.region= {},
                data.form.status= '1',    // 是否启用
                data.form.role= [],        // 角色
                data.form.btnPerm= []
           }
         data.editTip = props.editData && props.editData.editStatus;
       }
       const resetForm = ()=>{
           data.cityPickerData = {}
           refs.addForm.resetFields();
       }
       // 取消
       const close = (()=>{
         data.dialog_info_flag = false; 
         emit('show',{name:'jack'})  // 没有用sync 修饰符 可以用这种 一样的效果  子组件向父组件传值
         emit('update:flag',false)
         //$emit('close',false)
         // 删除 编辑添加的记号
         console.log('props',props.editData)
         if(props.editData && props.editData.editStatus === 1){ delete props.editData.editStatus}
         resetForm();
       })
       watch(()=> {
           data.dialog_info_flag = props.flag
       })
    //    watch([
    //        // ()=>data.dialog_info_flag,
    //         ()=>data.editTip,
    //      ],([province,city,])=>{
    //        // data.dialog_info_flag = props.flag
    //         data.editTip = props.editData.editStatus
    //      })


       const submit = (formName)=>{
           refs[formName].validate((valid) => {
                // 表单提交成功
                if (valid) {
                    /*
                        let AAA = {
                            a:{
                            a:{
                                a:{ }
                            }
                            }  拷贝后的数据 再进行更改 不会影响原来的数据
                        }   深拷贝 把 3 个 a 里面的对象都加以拷贝  浅拷贝 只拷贝 第一层 a 里面的东西 再里面的 a 不会进行拷贝
                    */
                    /*
                        let test = {
                            fun:function(){},
                            aaa:undefined,
                            sym:Symbol(),
                            ccc:'6666',
                            ddd:function(){}
                        }   注意 深拷贝后 一些 函数 转为字符串后 再不能反转过来  会丢失属性 
                        // console.log('test',JSON.parse(JSON.stringify(test)))  // { ccc:'666'}   
                    */
                    // 深拷贝  JSON.parse(JSON.stringify(data.form))  字符串  再次转json对象
                    // 浅拷贝  Object.assign({},data.form)  拷贝出来的是一个对象
                    //let resquestData =JSON.parse(JSON.stringify(data.form));
                    let resquestData = Object.assign({},data.form)
                    console.log('form',data.form)
                    console.log('resquestData',resquestData)
                    if(resquestData.role.length !== 0){
                           resquestData.role = resquestData.role.join();  // 数组转字符串 默认以 , 隔开
                    }
                    if(resquestData.btnPerm.length !== 0){
                          resquestData.btnPerm = resquestData.btnPerm.join();
                    }
                    resquestData.region = JSON.stringify(data.cityPickerData);
                    // 添加状态 需要密码 并且加密  编辑状态 值存在 需要密码 并且加密 否则删除
                    //  编辑
                    if(props.editData && props.editData.editStatus === 1){
                          if(resquestData.password){
                             resquestData.password = sha1(resquestData.password)
                         }else{
                             delete resquestData.password
                         }
                         console.log(222222)
                         userEdit(resquestData)
                    }else{ // 新增
                         console.log(111111)
                         resquestData.password = sha1(resquestData.password);
                         userAdd(resquestData)
                    }
                } else {
                   console.log('error submit!!');
                   return false;
                }
           })
        //    if(!data.form.username){
        //        root.$message({
        //            message:'用户名不能为空',
        //            type:'error'
        //        })
        //        return false;
        //    }
        //    if(!data.form.password){
        //        root.$message({
        //            message:'密码不能为空',
        //            type:'error'
        //        })
        //        return false;
        //    }
        //    if(data.form.role.length ===0){
        //        root.$message({
        //            message:'请选择用户角色',
        //            type:'error'
        //        })
        //        return false;
        //    }
       }
       //用户新增
       const userAdd = (resquestData)=>{
              console.log('add',resquestData)
              UserAdd(resquestData).then(res=>{
                        root.$message({
                            message:res.data.data.message,
                            type:'success'
                        })
                        close();
                        emit('refreshTableData')
                    }).catch(err=>{
                    })
           }
           //用户编辑
           const userEdit = (resquestData)=>{
             console.log('edit',resquestData)  
             UserEdit(resquestData).then(res=>{
                        root.$message({
                            message:res.data.data.message,
                            type:'success'
                        })
                        close();
                        emit('refreshTableData')
                        delete resquestData.editStatus
                    }).catch(err=>{
                    })
                    
       }
       return {
          data,
          close,
          openDialog,
          submit,
       }
    },
}
</script>

<style lang="scss" scoped>

</style>
