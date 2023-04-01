export default {
    namespaced: true,
    state: {
        isVisible: false
    },

    mutations: {
        HIDE: (state) => state.isVisible = false,
        SHOW: (state) => state.isVisible = true
    },

    getters: {
        isVisible: (state) => state.isVisible
    },

    actions: {
        hideSpinner({commit}) {
            commit('HIDE');
        },
        showSpinner({commit}) {
            commit('SHOW');
        }
    }
}