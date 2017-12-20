import Vue from 'vue'
import Vuex from 'vuex'
import * as types from '@/store/mutation-types'

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        loading: false
    },
    mutations: {
        [types.commonState_loading] (state,loading) {
            state.loading=loading;
        }
    },
    actions: {
        loadingTrue (context) {
            context.commit(types.commonState_loading,true)
        },
        loadingFalse (context) {
            context.commit(types.commonState_loading,false)
        }
    },
   strict: true
})
