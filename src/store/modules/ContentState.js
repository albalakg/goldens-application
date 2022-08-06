const ContentState = {
    namespaced: true,

    state: {
        lessons:            null,
        trainers:           null,
        courses:            null,
        categories:         null,
        showLastActiveCard: true
    },

    getters: {
        lessons: state => state.lessons,
        trainers: state => state.trainers,
        showLastActiveCard: state => state.showLastActiveCard,
        courses: state => state.courses,
        categories: state => state.categories,
    },

    mutations: {
        SET_LESSONS(state, lessons) {
            state.lessons = lessons;
        },

        SET_TRAINERS(state, trainers) {
            state.trainers = trainers;
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

        ADD_COURSES(state, courses) {
            if(state.courses) {
                return state.courses = state.courses.concat(courses);
            }

            state.courses = courses;
        },

        SET_CATEGORIES(state, categories) {
            state.categories = categories;
        }
    },

    actions: {
        getCategories({ state, commit }) {
            return new Promise((resolve) => {
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
            return new Promise((resolve) => {
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
        getTrainers({ state, commit }) {
            return new Promise((resolve) => {
                if(state.trainers) {
                    return resolve(state.trainers);
                }

                axios.get('content/trainers')
                    .then(res => {
                        commit('SET_TRAINERS', res.data.data);
                        return resolve(res.data.data);
                    })
                    .catch(err => {
                        warning(err);
                    })
            })
       },

        getActiveCourses({ commit }) {
            return new Promise((resolve) => {
                axios.get('content/courses')
                    .then(res => {
                        const courses = res.data.data.map(course => {
                            course.active_areas_with_active_lessons = course.guest_active_areas_with_active_lessons;
                            delete course.guest_active_areas_with_active_lessons;

                            course.active_areas_with_active_lessons = course.active_areas_with_active_lessons.map(courseArea => {
                                courseArea.active_lessons = courseArea.guest_active_lessons;
                                delete courseArea.guest_active_lessons;

                                courseArea.active_lessons = courseArea.active_lessons.map(lesson => {
                                    lesson.video = lesson.guest_video;
                                    delete lesson.guest_video;
                                    return lesson
                                })
                                
                                return courseArea
                            })

                            return course
                        })
                        commit('ADD_COURSES', courses);
                        return resolve(res.data.data);
                    })
                    .catch(err => {
                        warning(err);
                    })
            })
       },

        getCourse({ state, commit }, courseId) {
            return new Promise((resolve) => {
                if(state.courses) {
                    const course = state.courses.find(course => course.id == courseId);
                    if(course) {
                        return resolve(course);
                    }
                }

                axios.get('content/courses/' + courseId)
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