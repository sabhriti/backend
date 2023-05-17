export default {
    state: {
        alertMessage: '',
        alertType: 'info',
        isHidden: true,
        alertClass: ''
    },
    actions: {
        displayHttpResponseErrorMessage: ({commit, state}, error) => {
            commit('UPDATE_ALERT_MESSAGE', "Something went wrong. Please try again.");

            if (error.response) {
                if (error.response.data) {
                    if (error.response.data.message) {
                        commit('UPDATE_ALERT_MESSAGE', error.response.data.message);
                    }
                }
            }

            commit('UPDATE_ALERT_TYPE', "danger");
            commit('SHOW_ALERT');

            if (!state.isVisible) {
                commit('UPDATE_ALERT_CLASS', `alert alert-${state.alertType}`);
            } else {
                commit('UPDATE_ALERT_CLASS', `alert alert-${state.alertType} d-none`);
            }
        },


        showError: ({commit, state}, message) => {
            commit('UPDATE_ALERT_MESSAGE', message);
            commit('UPDATE_ALERT_TYPE', "danger");
            commit('SHOW_ALERT');

            if (!state.isVisible) {
                commit('UPDATE_ALERT_CLASS', `alert alert-${state.alertType}`);
            } else {
                commit('UPDATE_ALERT_CLASS', `alert alert-${state.alertType} d-none`);
            }
        },

        showInfo: ({commit, state}, message) => {
            commit('UPDATE_ALERT_MESSAGE', message);
            commit('UPDATE_ALERT_TYPE', "info");
            commit('SHOW_ALERT');

            commit('UPDATE_ALERT_CLASS', `alert alert-${state.alertType}`);
        },

        hideAlert: ({commit, state}) => {
            commit('UPDATE_ALERT_CLASS', `alert alert-${state.alertType} d-none`);
            commit('HIDE_ALERT');
        }
    },
    getters: {
        alertMessage: (state) => state.alertMessage,
        alertClass: (state) => state.alertClass
    },
    mutations: {
        UPDATE_ALERT_MESSAGE: (state, message) => state.alertMessage = message,
        UPDATE_ALERT_TYPE: (state, type) => state.alertType = type,
        UPDATE_ALERT_CLASS: (state, alertClass) => state.alertClass = alertClass,
        SHOW_ALERT: (state) => state.isVisible = false,
        HIDE_ALERT: (state) => state.isVisible = true
    }
}
