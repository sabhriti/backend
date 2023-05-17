import {v4 as uuidv4} from 'uuid';

export default {
    namespaced: true,
    state: {
        id: '',
        title: '',
        description: ''
    },

    actions: {
        addNewCategory: ({state, commit, dispatch, rootGetters}) => {
            const existingCategories = rootGetters['questionCategoryList/categoryList'];

            if (existingCategories.some(category => category.title === state.title)) {
                dispatch('showError', " Category with same title already exists.", {root: true});
            } else {
                if (existingCategories.some(category => category.id === state.id)) {
                    const data = {
                        id: state.id,
                        title: state.title,
                        description: state.description
                    };

                    dispatch('questionCategoryList/updateCategoryInList', data, {root: true});

                } else {
                    const data = {
                        id: uuidv4(),
                        title: state.title,
                        description: state.description
                    };
                    dispatch('questionCategoryList/addNewCategoryToList', data, {root: true});
                }

                commit('CLEAR_STATE');
            }
        },

        populateForm({commit}, category) {
            commit('UPDATE_CATEGORY', category);
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
    },
    mutations: {
        UPDATE_QUESTION_CATEGORY_TITLE: (state, value) => state.title = value,
        UPDATE_QUESTION_CATEGORY_DESCRIPTION: (state, value) => state.description = value,
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
