import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: [],
    currentPage: 1,
    totalPages: undefined
  },
  mutations: {
    updateUsers (state, users) {
      state.users = users
    },
    updateCurrentPage (state, pageNumber) {
      state.currentPage = pageNumber
    },
    updateTotalPages (state, number) {
      state.totalPages = number
    }
  },
  actions: {
    getUsers (context, payload) {
      axios.get('https://reqres.in/api/users', {
        params: {
          page: payload
        }
      }).then(({ data }) => {
        context.commit('updateUsers', data.data)
        context.commit('updateCurrentPage', data.page)
        context.commit('updateTotalPages', data.total_pages)
      }).catch((error) => {
        console.log(error)
      })
    }
  },
  modules: {
  }
})
