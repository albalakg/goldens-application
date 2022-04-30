const ContentState = {
    namespaced: true,

    state: {
        lessons: null,
        courses: null,
        categories: null,
        showLastActiveCard: true
    },

    getters: {
        lessons: state => state.lessons,
        showLastActiveCard: state => state.showLastActiveCard,
        courses: state => state.courses,
        categories: state => state.categories,
    },

    mutations: {
        SET_LESSONS(state, lessons) {
            state.lessons = lessons;
        },

        SET_SHOW_LAST_ACTIVE_CARD(state, status) {
            state.showLastActiveCard = status;
        },

        ADD_COURSE(state, course) {
            if(state.courses) {
                return state.courses.push(course);
            }
            state.courses = [course];
        },

        SET_CATEGORIES(state, categories) {
            state.categories = categories;
        }
    },

    actions: {
        getCategories({ state, commit }) {
            return new Promise((resolve, reject) => {
                if(state.categories) {
                    return resolve(state.categories);
                }

                axios.get('content/course-categories')
                    .then(res => {
                        commit('SET_CATEGORIES', res.data.data);
                        return resolve(res.data.data);
                    })
                    .catch(err => {
                        warning(err);
                    })
            })
       },

        getLessons({ state, commit }) {
            return new Promise((resolve, reject) => {
                if(state.lessons) {
                    return resolve(state.lessons);
                }

                axios.get('content/lessons')
                    .then(res => {
                        commit('SET_LESSONS', res.data.data);
                        return resolve(res.data.data);
                    })
                    .catch(err => {
                        warning(err);
                    })
            })
       },

        getCourse({ state, commit }, courseId) {
            return new Promise((resolve, reject) => {
                if(state.courses) {
                    const course = state.courses.find(course => course.id === courseId);
                    if(course) {
                        return resolve(course);
                    }
                }

                axios.get('content/course/' + courseId)
                    .then(res => {
                        commit('ADD_COURSE', res.data.data);
                        return resolve(res.data.data);
                    })
                    .catch(err => {
                        warning(err);
                    })
            })
       },

       setShowLastActiveCard({ commit }, status) {
           commit('SET_SHOW_LAST_ACTIVE_CARD', status);
       }
    }
};

export default ContentState;