export default {
    namespaced: true,
    state: {
        isVisible: false
    },

    mutations: {
        TOGGLE_VISIBILITY: (state) => state.isVisible = !state.isVisible,
        HIDE: (state) => state.isVisible = false,
        SHOW: (state) => state.isVisible = true
    },

    getters: {
        isVisible: (state) => state.isVisible
    },

    actions: {
        toggleSpinner({commit}) {
            commit('TOGGLE_VISIBILITY');
        },
        hideSpinner({commit}) {
            commit('HIDE');
        },
        showSpinner({commit}) {
            commit('SHOW');
        }
    }
}