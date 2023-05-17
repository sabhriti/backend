import local_storage from "@/util/local_storage";

export default {
    namespaced: true,
    state: {
        categoryList: [],
        displayForm: false
    },

    actions: {
        addNewCategoryToList({commit}, newCategory) {
            let categoriesFromStorage = local_storage.get("question_category_list");

            if (null === categoriesFromStorage) {
                categoriesFromStorage = [];
            }

            categoriesFromStorage.push(newCategory);

            local_storage.setWithoutTtl("question_category_list", categoriesFromStorage);

            commit('ADD_NEW_CATEGORY_TO_LIST', newCategory);
        },

        updateCategoryInList({commit}, categoryToUpdate) {
            let categoriesFromStorage = local_storage.get("question_category_list");

            const category = categoriesFromStorage.filter(category => category.id === categoryToUpdate.id);
            const filteredCategories = categoriesFromStorage.filter(category => category.id !== categoryToUpdate.id);

            local_storage.remove("question_category_list");

            category.title = categoryToUpdate.title;
            category.description = categoryToUpdate.description;

            filteredCategories.push(category);
            local_storage.setWithoutTtl("question_category_list", filteredCategories);

            commit('ADD_ALL_CATEGORIES', filteredCategories);
        },

        loadCategoryList({commit}) {
            const categoriesFromStorage = local_storage.get('question_category_list');

            if (categoriesFromStorage) {
                commit('ADD_ALL_CATEGORIES',  local_storage.get('question_category_list'));
            }
        },

        toggleDisplayForm: ({commit}) => {
            commit('TOGGLE_DISPLAY_FORM');
        },

        showDisplayForm: ({commit}) => {
            commit('SHOW_DISPLAY_FORM');
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
        ADD_ALL_CATEGORIES: (state, categories) => state.categoryList = categories,
        TOGGLE_DISPLAY_FORM: (state) => state.displayForm = !state.displayForm,
        SHOW_DISPLAY_FORM: (state) => state.displayForm = true
    }
}