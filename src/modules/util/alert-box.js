export default {
    state: {
        alertMessage: '',
        alertType: 'info',
        isHidden: true
    },
    actions: {
        showError: ({commit}, message) => {
            console.log('messages: ', message);
            commit('UPDATE_ALERT_MESSAGE', message);
            commit('UPDATE_ALERT_TYPE', "danger");
            commit('SHOW_ALERT');
        },

        showInfo: ({commit}, message) => {
            commit('UPDATE_ALERT_MESSAGE', message);
            commit('UPDATE_ALERT_TYPE', "info");
            commit('SHOW_ALERT');
        },
        hideAlert: ({commit}) => {
            commit('HIDE_ALERT');
        }
    },
    getters: {
        alertMessage: (state) => state.alertMessage,
        alertType: (state) => state.alertType,
        isHidden: (state) => state.isHidden
    },
    mutations: {
        UPDATE_ALERT_MESSAGE: (state, message) => state.alertMessage = message,
        UPDATE_ALERT_TYPE: (state, type) => state.alertType = type,
        SHOW_ALERT: (state) => state.isHidden = false,
        HIDE_ALERT: (state) => state.isHidden = true
    }
}
