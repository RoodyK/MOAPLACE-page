export default {
  namespaced: true,
  state: function(){
    return {
      member:{ // 로그인한 회원 정보
        num:'1',
        id:'test',
        pwd:'testpwd',
        email:'t@t.com',
        name:'테스트',
        gender:'female',
        birth:'200202',
        phone:'010-1234-5678',
        address:'서울',
        regdate:'22/08/19',
        point:'2000'
      }
    }
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  }
}