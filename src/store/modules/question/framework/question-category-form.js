export default {
    namespaced: true,
    state: {
        title: '',
        description: ''
    },

    actions: {
        addNewCategory: ({state, dispatch, rootGetters}) => {
            const existingCategories = rootGetters['questionCategoryList/categoryList'];

            if (existingCategories.some(category => category.title === state.title)) {
                dispatch('showError', " Category with same title already exists.", {root: true});
            } else {
                dispatch('questionCategoryList/addNwCategoryToList', state, {root: true});
            }
        },

        hideForm: ({dispatch}) => {
            dispatch('questionCategoryList/toggleDisplayForm', {root:true});
        }
    },

    getters: {
        id: (state) => state.id,
        title: (state) => state.title,
        description: (state) => state.description,
    },
    mutations: {
        UPDATE_QUESTION_CATEGORY_TITLE: (state, value) => state.title = value,
        UPDATE_QUESTION_CATEGORY_DESCRIPTION: (state, value) => state.description = value
    }
}
