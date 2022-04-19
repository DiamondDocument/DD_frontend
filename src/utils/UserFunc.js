import user from "@/store/user";

let func = {
    getUser() {
        return user.getters.getUser(user.state());
    }
};
export default func;