import user from "./user";
import {createStore} from 'vuex'



export default new createStore({
  state(){
    return {
      isLogin : false,
      loginUser: {
        userId: null,
        nickname: null,
      },
      tableType: "",
      tableId: "",
      tableInfo: "",
    };
  },
  mutations: {
    login(state, user){
      state.isLogin = true;
      state.loginUser.userId = user.userId;
      state.loginUser.nickname = user.nickname;
    },
    logout(state){
      state.isLogin = false;
    },
    changeTable(state, info){
      state.tableInfo = info;
      state.tableId = info.split(":")[1];
      state.tableType = info.split(":")[0];
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