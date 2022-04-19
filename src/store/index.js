import user from "./user";
import {createStore} from 'vuex'



export default new createStore({
  state: {
    userId:'', //全局状态用户ID
  },
  mutations: {
  },
  actions: {
    /* 清空 localStorage 方法 */
    clear({ commit }) {
      commit("$_removeStorage");
    }
  },
  modules: {
    user
  }
})