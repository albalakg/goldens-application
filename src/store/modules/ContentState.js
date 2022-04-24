const ContentState = {
    namespaced: true,

    state: {
        lessons: null,
        courses: null,
        categories: null,
    },

    getters: {
        lessons: state => state.lessons,
        courses: state => state.courses,
        categories: state => state.categories,
    },

    mutations: {
        SET_LESSONS(state, lessons) {
            state.lessons = lessons;
        },

        ADD_COURSE(state, course) {
            if(state.courses) {
                return state.courses.push(course);
            }
            state.courses = [course];

            console.log('state.courses', state.courses);
        },

        SET_CATEGORIES(state, categories) {
            state.categories = categories;
        }
    },

    actions: {
        getCategories({ state, commit }) {
            return new Promise((resolve, reject) => {
                if(state.courseCategories) {
                    return resolve(state.courseCategories);
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
    }
};

export default ContentState;