const CourseCategoryState = {
    namespaced: true,

    state: {
        courseCategories: false
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
        getCourseCategories({ state, commit }, status) {
            return new Promise((resolve, reject) => {
                if(state.courseCategories) {
                    return resolve(state.courseCategories);
                }

                axios.get('course-categories')
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