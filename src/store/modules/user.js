import { logout, resetToken } from "@/services/user";

export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    resetToken() {
      resetToken();
    },
    logout() {
      logout();
    }
  },
  getters: {}
};
