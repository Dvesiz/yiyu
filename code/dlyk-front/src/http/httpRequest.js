import axios from "axios";
//定义后端接口地址的前缀
axios.defaults.baseURL = "http://localhost:8090";
export function doGet(url,params) {
  axios({
      method:'get',
      url:url,
      params:params ,
      dataType:"json"
  }).then(function (response){
      var s = "";
      response.data.forEach(function (stu){
          s += stu.name + ":" + stu.value + "<br/>";
      });
      document.getElementById("result").innerHTML = s;
  })
}

export function doPost(url,data) {
  return axios({
      method:'post',
      url:url,
      data:data,
      dataType:"json"
  })
}

export function doDelete(url,params) {
  axios({
      method:'delete',
      url:url,
      params:params ,
      dataType:"json"
  }).then(function (response){
      var s = "";
      response.data.forEach(function (stu){
          s += stu.name + ":" + stu.value + "<br/>";
      });
      document.getElementById("result").innerHTML = s;
  })
}
export function doPut(url,data) {
  axios({
      method:'put',
      url:url,
      data:data,
      dataType:"json"
  }).then(function (response){
      var s = "";
      response.data.forEach(function (stu){
          s += stu.name + ":" + stu.value + "<br/>";
      });
      document.getElementById("result").innerHTML = s;
  })
}