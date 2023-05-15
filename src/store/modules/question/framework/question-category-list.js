export default {
    namespaced: true,
    state: {
        categoryList: [],
        displayForm: false
    },

    actions: {
        addNwCategoryToList({commit}, newCategory) {
            commit('ADD_NEW_CATEGORY_TO_LIST', newCategory);
        },

        toggleDisplayForm: ({commit}) => {
            commit('TOGGLE_DISPLAY_FORM');
        }
    },

    getters: {
        categoryList: (state) => state.categoryList,
        displayForm: (state) => state.displayForm
    },

    mutations: {
        ADD_NEW_CATEGORY_TO_LIST: (state, category) => {
            state.categoryList.push(category);
        },

        TOGGLE_DISPLAY_FORM: (state) => state.displayForm = !state.displayForm
    }
}