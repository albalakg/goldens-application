const CourseCategoryState = {
    namespaced: true,

    state: {
        courseCategories: null
    },

    getters: {
        courseCategories: state => state.courseCategories
    },

    mutations: {
        SET_COURSE_CATEGORIES(state, status) {
            state.courseCategories = status;
        }
    },

    actions: {
        getCourseCategories({ state, commit }) {
            return new Promise((resolve, reject) => {
                if(state.courseCategories) {
                    return resolve(state.courseCategories);
                }

                axios.get('content/course-categories')
                    .then(res => {
                        commit('SET_COURSE_CATEGORIES', res.data.data);
                        return resolve(res.data.data);
                    })
                    .catch(err => {
                        warning(err);
                    })
            })
       }
    }
};

export default CourseCategoryState;