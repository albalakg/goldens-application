import axios from "axios";
import ContentService from "../../helpers/ContentService";
import router from '../../router';

const UserState = {
    namespaced: true,

    state: {
        progress:       null,
        courses:        null,
        lastActive:     null,
        orders:         null,
        supportTickets: null,
        profile:        {},
        favorites:      [],
        courseAreas:    [],
        lessons:        [],
    },

    getters: {
        supportTickets: state   => state.supportTickets,
        profile:            state   => state.profile,
        orders:             state   => state.orders,
        favorites:          state   => state.favorites,
        progress:           state   => state.progress,
        hasActiveCourse:    state   => state.courses && state.courses.length,
        courses:            state   => state.courses,
        courseAreas:        state   => state.courseAreas,
        lessons:            state   => state.lessons,
        firstName:          state   => state.profile.first_name,
        lastName:           state   => state.profile.last_name,
        fullName:           state   => state.profile.first_name + ' ' + state.profile.last_name,
        phone:              state   => state.profile.phone,
        gender:             state   => state.profile.gender,
        email:              state   => state.profile.email,
        team:               state   => state.profile.team,
        city:               state   => state.profile.city,
        lastActive:         state   => state.lastActive,
    },

    mutations: {
        SET_USER_PROFILE(state, userProfile) {
            state.profile       = userProfile;
            state.profile.team  = userProfile.team?.name
            state.profile.city  = userProfile.city?.name
        },
        
        SET_USER_DETAILS(state, userDetails) {
            state.profile.first_name    = userDetails.first_name;
            state.profile.last_name     = userDetails.last_name;
            state.profile.gender        = userDetails.gender;
            state.profile.phone         = userDetails.phone;
            state.profile.city          = userDetails.city;
            state.profile.team          = userDetails.team;
        },
        
        SET_USER_SUPPORT_TICKETS(state, userSupportTickets) {
            state.supportTickets = userSupportTickets;
        },

        SET_USER_PROGRESS(state, userProgress) {
            state.progress = userProgress;
        },

        UPDATE_USER_PROGRESS(state, data) {
            try {
                const courseIndex   = state.progress.findIndex(course => course.id === data.user_course_id);
                const course        = state.progress[courseIndex];
                const lessonIndex   = course.lessons_progress.findIndex(lesson => lesson.course_lesson_id === data.course_lesson_id);
                course.progress     = Math.floor(data.course_progress);

                if(lessonIndex !== -1) {
                    state.progress[courseIndex].lessons_progress[lessonIndex] = data;
                } else {
                    state.progress[courseIndex].lessons_progress.push(data);
                }
            } catch(err) {
                console.error(err)
            }
        },

        SET_USER_LAST_ACTIVE(state, lastActive) {
            state.lastActive = lastActive;
        },

        SET_USER_FAVORITES(state, userFavorites) {
            state.favorites = userFavorites;
        },

        SET_USER_ORDERS(state, userOrders) {
            state.orders = userOrders;
        },

        SET_USER_COURSES(state, courses) {
            state.courses = courses;
        },
        SET_USER_COURSE_AREAS(state, courseAreas) {
            state.courseAreas = courseAreas;
        },

        SET_USER_LESSONS(state, courses) {
            courses.forEach(course => {
                course.active_areas_with_active_lessons.forEach(courseArea => {
                    state.lessons = state.lessons.concat(courseArea.active_lessons);
                })
            })
        },

        ADD_CONTENT_IN_FAVORITES(state, newLesson) {
            const contentIndex = state.favorites.findIndex(lesson => lesson.id === newLesson.id);
            if(contentIndex === -1) {
                state.favorites.push(newLesson)
            }
        },

        REMOVE_CONTENT_IN_FAVORITES(state, lessonId) {
            const contentIndex = state.favorites.findIndex(lesson => lesson.id === lessonId);
            if(contentIndex !== -1) {
                state.favorites.splice(contentIndex, 1);
            }
        },

    },

    actions: {
        async init({ dispatch }) {
            await dispatch('getCourses');
            await dispatch('getProgress');
            await dispatch('getProfile');
            dispatch('getFavorites');
        },

        clearUserState({ commit }) {
            commit('SET_USER_PROFILE', {});
            commit('SET_USER_PROGRESS', null);
            commit('SET_USER_LAST_ACTIVE', null);
            commit('SET_USER_COURSES', null);
            commit('SET_USER_LESSONS', []);
        },

        updateProfile({ commit, dispatch }, data) {
            return new Promise((resolve) => {
                axios.post('profile/update', data)
                    .then(res => {
                        commit('SET_USER_DETAILS', res.data.data);
                        dispatch('MessageState/addMessage', {message: 'פרטי המשתמש עודכנו בהצלחה'}, {root:true});
                    }).catch(() => {
                        dispatch('MessageState/addMessage', {
                            message: 'מצטערים אך לא הצלחנו לעדכן את פרטי המשתמש',
                            type: 'error',
                        }, {root:true});
                    }).finally(() => {
                        resolve()
                    })
            })
        },

        updateEmail({ dispatch }, data) {
            return new Promise((resolve) => {
                axios.post('profile/email', data)
                    .then(() => {
                        dispatch('MessageState/addMessage', {message: 'נשלח מייל לאישור בקשת עדכון המייל'}, {root:true});
                    }).catch(() => {
                        console.log(2);
                        dispatch('MessageState/addMessage', {
                            message: 'מצטערים אך לא הצלחנו לעדכן את המייל',
                            type: 'error',
                        }, {root:true});
                    }).finally(() => {
                        resolve()
                    })
                })
        },

        updatePassword({ dispatch }, data) {
            return new Promise((resolve) => {
                axios.post('profile/change-password', data)
                    .then(res => {
                        dispatch('MessageState/addMessage', {message: 'הסיסמה עודכנה בהצלחה'}, {root:true});
                        resolve(res.data)
                    }).catch(err => {
                        dispatch('MessageState/addMessage', {
                            message: 'מצטערים אך לא הצלחנו לעדכן את הסיסמה',
                            type: 'error',
                        }, {root:true});
                        resolve(err.response.data)
                    }).finally(() => {
                        resolve()
                    })
                })
        },

        getProfile({ commit, dispatch}) {
            axios.get('profile')
                .then(res => {
                    const details = res.data.data.details;
                    details.email = res.data.data.email;
                    commit('SET_USER_PROFILE', details);
                })
                .catch(() => {
                    dispatch('MessageState/addMessage', {
                        message: 'מצטערים אבל נכשלה הבקשה למשיכת פרטי הפרופיל',
                        type: 'error',
                    }, {root:true});
                })
        },
        
        getSupportTickets({ state, commit, dispatch }) {
            if(state.supportTickets) {
                return;
            }

            axios.get('profile/support-tickets')
                .then(res => {
                    commit('SET_USER_SUPPORT_TICKETS', res.data.data);
                })
                .catch(() => {
                    dispatch('MessageState/addMessage', {
                        message: 'מצטערים אבל נכשלה הבקשה למשיכת פרטי הבקשות תמיכה',
                        type: 'error',
                    }, {root:true});
                })
        },
        
        getOrders({ state, commit, dispatch }) {
            if(state.orders) {
                return;
            }
            
            axios.get('profile/orders')
                .then(res => {
                    commit('SET_USER_ORDERS', res.data.data);
                })
                .catch(() => {
                    dispatch('MessageState/addMessage', {
                        message: 'מצטערים אבל נכשלה הבקשה למשיכת פרטי הסטוריית ההזמנות',
                        type: 'error',
                    }, {root:true});
                })
        },
        
        getFavorites({ commit, dispatch }) {
            axios.get('profile/favorites')
                .then(res => {
                    commit('SET_USER_FAVORITES', res.data.data);
                })
                .catch(() => {
                    dispatch('MessageState/addMessage', {
                        message: 'מצטערים אבל נכשלה הבקשה למשיכת השיעורים המועדפים',
                        type: 'error',
                    }, {root:true});
                })
        },
        
        getProgress({ state, commit, dispatch }) {
            return new Promise((resolve) => {
                if(state.progress) {
                    resolve(state.courses);
                    return 
                }

                axios.get('profile/progress')
                    .then(res => {
                        commit('SET_USER_PROGRESS', res.data.data.courses);
                        commit('SET_USER_LAST_ACTIVE', res.data.data.last_active_lesson);
                        resolve(res.data.data.courses);
                    })
                    .catch(() => {
                        dispatch('MessageState/addMessage', {
                            message: 'מצטערים אבל נכשלה הבקשה למשיכת פרטים על התקדמות הקורס',
                            type: 'error',
                        }, {root:true});
                    })
            })
        },
        
        getCourses({ commit, state, dispatch }) {
            return new Promise((resolve) => {
                if(state.courses) {
                    resolve(state.courses);
                    return 
                }

                axios.get('profile/courses')
                    .then(res => {
                        commit('SET_USER_COURSES', res.data.data);
                        commit('SET_USER_LESSONS', res.data.data);
                        if(!res.data.data.length) {
                            dispatch('ContentState/getActiveCourses', {}, {root:true});
                        }
                        resolve(state.courses);
                    })
                    .catch(() => {
                        dispatch('MessageState/addMessage', {
                            message: 'מצטערים אבל נכשלה הבקשה למשיכת התכנים שלך',
                            type: 'error',
                        }, {root:true});
                    })
            })
        },
        
        toggleFavorite({ commit, dispatch }, lessonId) {
            return new Promise((resolve) => {
                const action = ContentService.isLessonFavorite(lessonId) ? 'remove' : 'add';
                const data = {
                    lesson_id: lessonId
                };

                axios.post(`profile/favorites/${action}`, data)
                    .then(res => {
                        if(action === 'remove') {
                            commit('REMOVE_CONTENT_IN_FAVORITES', lessonId)
                        } else {
                            commit('ADD_CONTENT_IN_FAVORITES', res.data.data)
                        }
                    })
                    .catch(() => {
                        dispatch('MessageState/addMessage', {
                            message: 'מצטערים אבל נכשלה הבקשה לעדכן את המועדפים',
                            type: 'error',
                        }, {root:true});
                    })
                    .finally(() => {
                        resolve()
                    })
            })
        },
        
        goToLastActiveCourse({ state }) {
            try {
                const courses = state.courses;

                if(!courses || !courses.length) {
                    return router.push('/');
                }

                const lesson    = state.lessons.find(lesson => lesson.id == state.lastActive.id);
                let route       = lesson ? '/courses/' + lesson.course_id : '/'; 

                if(!lesson && courses) {
                    route = '/courses/' + courses[0].id;
                }

                if(route === window.location.hash.replace('#', '')) {
                    return;
                }

                router.push(route)
            } catch(error) {
                console.error(error);
                
                router.push('/');
            }
        },

        updateUserVideoProgress({ commit }, data) {
            return new Promise((resolve) => {
                axios.post(`profile/lesson/progress`, data)
                    .then(res => {
                        commit('UPDATE_USER_PROGRESS', res.data.data);
                    }).finally(() => {
                        resolve()
                    });
            })
        },

        // eslint-disable-next-line no-empty-pattern
        saveUserLandedOnPageNotFound({}, path) {
            axios.get('profile/landed-on-page-not-found?path=' + encodeURIComponent(path))
        }

    }
};

export default UserState;