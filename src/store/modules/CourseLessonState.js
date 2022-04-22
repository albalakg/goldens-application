const CourseLessonState = {
    namespaced: true,

    state: {
        lessons: null
    },

    getters: {
        lessons: state => state.lessons
    },

    mutations: {
        SET_COURSE_LESSONS(state, status) {
            state.lessons = status;
        }
    },

    actions: {
        getCourseLessons({ state, commit }) {
            return new Promise((resolve, reject) => {
                if(state.lessons) {
                    return resolve(state.lessons);
                }

                axios.get('content/lessons')
                    .then(res => {
                        commit('SET_COURSE_LESSONS', res.data.data);
                        return resolve(res.data.data);
                    })
                    .catch(err => {
                        warning(err);
                    })
            })
       }
    }
};

export default CourseLessonState;