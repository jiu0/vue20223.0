/*
过滤特殊字符串
*/ 
import { MessageBox } from 'element-ui';
export function stripscript(str)
   {
    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{ }【】‘；：”“'。，、？]")
    var rs = "";
    for (var i = 0; i < str.length; i++) {
    rs = rs+str.substr(i, 1).replace(pattern, '');
    }
    return rs;
  }

// 验证邮箱
  export function validateEmail(value)
   {
    let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    if(!reg.test(value)){
        return true;
    }else{
        return false;
    }
  }
  // 验证密码  let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
  export function validatePass(value)
   {
    let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;  
    if(!reg.test(value)){
        return true;
    }else{
        return false;
    }
  }

  // 验证验证码   let reg = /^[a-z0-9]{6}$/;  // 6 位数字和字母结合
  export function validateVCode(value)
   {
    let reg = /^[0-9]{4}$/;  // 4 位数字
    if(!reg.test(value)){
        return true;
    }else{
        return false;
    }
  }

// confirm 封装的第2种写法
export function confirm(params){
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
