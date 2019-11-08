import { logout, resetToken } from "@/services/user";

export default {
  namespaced: true,
  state: {
    count: 1
  },
  mutations: {
    ADD(state, val = 1) {
      state.count = state.count + val;
    }
  },
  actions: {
    resetToken() {
      resetToken();
    },
    logout() {
      logout();
    },
    addAction({ commit }, { val }) {
      return new Promise(resolve => {
        setTimeout(() => {
          commit("ADD", val);
          resolve();
        }, 3000);
      });
    }
  },
  getters: {}
};
