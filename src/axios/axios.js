import axios from "axios"
import router from "@/router/index.js"
// import store from "@/store/index.js"

const instance = axios.create({
  baseURL: "http://localhost:9090",
  headers: {
    'Access-Control-Allow-Origin' : '*'
  }
});

instance.interceptors.request.use(function(config) {
  // 로그인된 모든 요청 헤더에 토큰 전달.
  let token = localStorage.getItem("access_token");
  if(token != null) {
    config.headers['Authorization'] = token;
  }
  return config;
})

instance.interceptors.response.use(function(response) {
  return response;

}, (error) => {
  if(error.response.status === 401) {
    alert('로그인 시간이 만료되었습니다.');
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    
    return router.push("/moaplace.com/users/login");
  }
  return Promise.reject(error);
})

export default instance;
