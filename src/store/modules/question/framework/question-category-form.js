import {v4 as uuidv4} from 'uuid';

export default {
    namespaced: true,
    state: {
        id: '',
        title: '',
        description: '',
        formMode: "Add"
    },

    actions: {
        saveCategory: ({state, commit, dispatch, rootGetters}) => {
            const existingCategories = rootGetters['questionCategoryList/categoryList'];

            if (existingCategories.some(category => category.id === state.id)) {
                const filtered = existingCategories.filter(category => category.id !== state.id);

                if (filtered.some(category => category.title === state.title)) {
                    dispatch('showError', " Category with same title already exists.", {root: true});
                } else {
                    const data = {
                        id: state.id,
                        title: state.title,
                        description: state.description
                    };

                    dispatch('questionCategoryList/updateCategoryInList', data, {root: true});
                    commit('CLEAR_STATE');
                    dispatch('hideForm');
                }
            } else {
                if (existingCategories.some(category => category.title === state.title)) {
                    dispatch('showError', " Category with same title already exists.", {root: true});
                } else {
                    const data = {
                        id: uuidv4(),
                        title: state.title,
                        description: state.description
                    };
                    dispatch('questionCategoryList/addNewCategoryToList', data, {root: true});
                    commit('CLEAR_STATE');
                    dispatch('hideForm');
                }
            }
        },

        populateForm({commit}, category) {
            commit('UPDATE_CATEGORY', category);
            commit('UPDATE_QUESTION_CATEGORY_FORM_MODE', "Save");
        },

        loadCategories: ({dispatch}) => {
            dispatch('questionCategoryList/loadCategoryList', {}, {root: true});
        },

        hideForm: ({dispatch}) => {
            dispatch('questionCategoryList/toggleDisplayForm', {}, {root: true});
        }
    },

    getters: {
        id: (state) => state.id,
        title: (state) => state.title,
        description: (state) => state.description,
        formMode: (state) => state.formMode
    },
    mutations: {
        UPDATE_QUESTION_CATEGORY_TITLE: (state, value) => state.title = value,
        UPDATE_QUESTION_CATEGORY_DESCRIPTION: (state, value) => state.description = value,
        UPDATE_QUESTION_CATEGORY_FORM_MODE: (state, mode) => state.formMode = mode,
        CLEAR_STATE: (state) => {
            state.id = '';
            state.title = '';
            state.description = ''
        },
        UPDATE_CATEGORY: (state, category) => {
            state.id = category.id;
            state.title = category.title;
            state.description = category.description;
        }
    }
}
