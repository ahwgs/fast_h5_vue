import { logout, resetToken, getUserInfo } from '@/services/user'
import { getToken } from '@/utils/storage'

export default {
  namespaced: true,
  state: {
    count: 1,
    token: getToken() || '',
    userInfo: null
  },
  mutations: {
    ADD(state, val = 1) {
      state.count = state.count + val
    },
    SAVE_USER(state, userData = {}) {
      state.user = userData
    }
  },
  actions: {
    resetToken() {
      resetToken()
    },
    logout() {
      logout()
      localStorage.clear()
    },
    addAction({ commit }, { val }) {
      return new Promise(resolve => {
        setTimeout(() => {
          commit('ADD', val)
          resolve()
        }, 3000)
      })
    },
    getUser({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo()
          .then(response => {
            const { data } = response
            if (!data) {
              // eslint-disable-next-line
                            reject('Verification failed, please Login again.')
            }
            commit('SAVE_USER', data)
            resolve(data)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  },
  getters: {
    userData(state) {
      return state.userInfo
    }
  }
}
