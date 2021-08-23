import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
      tasks: [         
      ]
    },
    mutations: { 
        sort(state) {
            state.tasks.sort(function(a, b) {
                if (Date.parse(a.date) > Date.parse(b.date)) {
                  return 1;
                }
                if (Date.parse(a.date) < Date.parse(b.date)) {
                  return -11;
                }
                return 0
              })
        }     
    },
    actions: {
    },
    modules: {
    }
  })
  