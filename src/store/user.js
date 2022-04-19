const key = 'user'
const user = {
    state() {
        return {
            user: null
        }
    },
    /* 从 localStorage 中读取 user 数据并转换成 JSON 格式 */
    getters: {
        getUser: function (state) {
            if (!state.user) {
                state.user = JSON.parse(localStorage.getItem(key))
            }
            return state.user
        }
    },
    /* 更改 store 状态的事件 */
    mutations: {
        /* 存数据，将 JSON 格式的数据转化为字符串形式存储到以 localStorage 中以 `user` 为键的值中 */
        $_setStorage (state, value) {
            state.user = value
            localStorage.setItem(key, JSON.stringify(value))
        },
        /* 清空数据，将状态恢复初始值，并从 localStorage 中移除对象 */
        $_removeStorage (state) {
            state.user = null
            localStorage.removeItem(key)
        }
    },
    /* 向上提供调用接口 */
    actions: {
        /*存储数据 */
        saveUserInfo({ commit }, data) {
            commit('$_setStorage', data)
        },
        /* 清空数据 */
        clearUserInfo({ commit }) {
            commit('$_removeStorage');
        }
    }
};

export default user