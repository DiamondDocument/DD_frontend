import user from "./user";
import {createStore} from 'vuex'



export default new createStore({
  state(){
    return {
      isLogin : false,
      loginUser: {
        userId: "",
        nickname: "",
      },
      // loginUser : localStorage.getItem('loginUser'),
      tableInfo: null,
      tableType: null,
      tableId: null
    };
  },
  mutations: {
    login(state, user){
      console.log("set login");
      state.isLogin = true;
      state.loginUser.userId = user.userId;
      state.loginUser.nickname = user.nickname;
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
    },
    init(state){
      state.isLogin = localStorage.getItem('isLogin');
      let localLoginUser = localStorage.getItem('loginUser');
      // state.loginUser = localStorage.getItem('loginUser');
      if(localLoginUser !== null){
        state.loginUser = JSON.parse(localLoginUser);
      }
      if(state.tableInfo !== null){
        state.tableId = state.tableInfo.split(":")[1];
        state.tableType = state.tableInfo.split(":")[0];
      }
      console.log("完成初始化，全局状态为：");
      console.log(state.tableInfo);
      console.log(state.isLogin);
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