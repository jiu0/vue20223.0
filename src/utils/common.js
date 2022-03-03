 // 转时间戳
 export function timestampToTime(timestamp){
   var date = new Date(timestamp * 1000); // 时间为10 位 要 * 1000 时间是13 位 不要 * 1000 
   var Y = date.getFullYear() + '-';
   var M = date.getMonth() + 1 + '-';
   var D = date.getDate() + ' ';
   var h = date.getHours() + ':';
   var m = date.getMinutes()+ ':';
   var s = date.getSeconds();
   return Y + M + D + h + m + s;
} 