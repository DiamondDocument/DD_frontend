import user from "./user";
import {createStore} from 'vuex'



export default new createStore({
  state(){
    return {
      isLogin : localStorage.getItem('isLogin'),
      // loginUser: {
      //   userId: null,
      //   nickname: null,
      // },
      loginUser : localStorage.getItem('loginUser'),
      tableInfo: localStorage.getItem('tableInfo'),
      tableType: localStorage.getItem('tableInfo') === null? null: localStorage.getItem('tableInfo').split(":")[0],
      tableId: localStorage.getItem('tableInfo') === null? null: localStorage.getItem('tableInfo').split(":")[1],
    };
  },
  mutations: {
    login(state, user){
      state.isLogin = true;
      state.loginUser['userId'] = user.userId;
      state.loginUser['nickname'] = user.nickname;
      localStorage.setItem('isLogin', state.isLogin);
      localStorage.setItem('loginUser', JSON.stringify(state.loginUser));
    },
    logout(state){
      state.isLogin = false;
      localStorage.setItem('isLogin', false);
    },
    changeTable(state, info){
      state.tableInfo = info;
      state.tableId = info.split(":")[1];
      state.tableType = info.split(":")[0];
      localStorage.setItem('tableInfo', state.tableInfo);
      // if(info.tableId === "my"){
      //   state.tableInfo = "my";
      // }else{
      //   state.tableInfo = info.tableId + ":" + info.tableType;
      // }
    }
  },
  actions: {
    // /* 清空 localStorage 方法 */
    // clear({ commit }) {
    //   commit("$_removeStorage");
    // }
  },
  modules: {
    // user
  }
})