import axios from "axios";
import ContentService, { SCHEDULE_TRAINING_TYPE_ID } from "../../helpers/ContentService";
import router from '../../router';
import Auth from '../../helpers/Auth'

const UserState = {
    namespaced: true,

    state: {
        initiated:      false,
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
        supportTickets:     state   => state.supportTickets,
        initiated:          state   => state.initiated,
        profile:            state   => state.profile,
        orders:             state   => state.orders,
        favorites:          state   => state.favorites,
        progress:           state   => state.progress,
        hasActiveCourse:    state   => state.courses === null ? null : Boolean(state.courses && state.courses.length),
        courses:            state   => state.courses,
        courseAreas:        state   => state.courseAreas,
        lessons:            state   => state.lessons,
        firstName:          state   => state.profile.first_name,
        lastName:           state   => state.profile.last_name,
        isSubscribed:       state   => state.profile.isSubscribed,
        fullName:           state   => state.profile.first_name ? state.profile.first_name + ' ' + state.profile.last_name : '',
        phone:              state   => state.profile.phone,
        gender:             state   => state.profile.gender,
        email:              state   => state.profile.email,
        team:               state   => state.profile.team,
        city:               state   => state.profile.city,
        birthdate:          state   => state.profile.birth_date,
        lastActive:         state   => state.lastActive,
    },

    mutations: {
        SET_USER_PROFILE(state, userProfile) {
            state.profile               = userProfile;
            state.profile.team          = userProfile.team?.name;
            state.profile.city          = userProfile.city?.name;
            state.profile.isSubscribed  = userProfile.is_subscribed;
            delete state.profile.is_subscribed;
        },
        
        SET_USER_DETAILS(state, userDetails) {
            state.profile.first_name    = userDetails.first_name;
            state.profile.last_name     = userDetails.last_name;
            state.profile.gender        = userDetails.gender;
            state.profile.phone         = userDetails.phone;
            state.profile.city          = userDetails.city;
            state.profile.team          = userDetails.team;
            state.profile.birth_date    = userDetails.birth_date;
            state.profile.isSubscribed  = userDetails.is_subscribed ? 1 : 0;

        },
        
        SET_USER_SUPPORT_TICKETS(state, userSupportTickets) {
            state.supportTickets = userSupportTickets;
        },

        SET_USER_PROGRESS(state, userProgress) {
            state.progress = userProgress;
        },

        UPDATE_SCHEDULE_DATE(state, updatedSchedule) {
            state.courses.forEach(course => {
                const scheduleIndex = course.schedules.findIndex(schedule => schedule.id === updatedSchedule.scheduleId);
                course.schedules[scheduleIndex].date            = updatedSchedule.date;
                course.schedules[scheduleIndex].isDateUpdated   = true;
            });
        },

        DELETE_SCHEDULE_DATE(state, scheduleId) {
            state.courses.forEach(course => {
                const scheduleIndex = course.schedules.findIndex(schedule => schedule.id === scheduleId);
                course.schedules.splice(scheduleIndex, 1);
            });
        },

        CREATE_TRAINING_SCHEDULE(state, newTrainingSchedule) {
            const course = state.courses.find(course => course.id = newTrainingSchedule.courseId);
            if(!course) {
                return;
            }
            
            if(!course.schedules) {
                course.schedules = [];
            }


            const lesson = ContentService.findLessonById(newTrainingSchedule.lessonId);
            if(!lesson) {
                return;
            }

            course.schedules.push({
                id:                         newTrainingSchedule.id,
                scheduleId:                 newTrainingSchedule.id,
                type_id:                    SCHEDULE_TRAINING_TYPE_ID,
                course_id:                  course.id,
                isSetByUser:                true,
                course_lesson_id:           newTrainingSchedule.lessonId,
                date:                       newTrainingSchedule.date,
                course_area_id:             lesson.course_area_id
            }); 
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

        SET_INITIATED(state, status) {
            state.initiated = status;
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
        async init({ state, dispatch }) {
            if(state.initiated) {
                return;
            }

            return await Promise.allSettled(
                [
                    dispatch('getCourses'),
                    dispatch('getProgress'),
                    dispatch('getProfile'),
                    dispatch('getFavorites'),
                ]
            )
        },

        setInitiated({ commit }, status) {
            commit('SET_INITIATED', status);
        },

        clearUserState({ commit }) {
            commit('SET_USER_PROFILE', {});
            commit('SET_USER_PROGRESS', null);
            commit('SET_USER_LAST_ACTIVE', null);
            commit('SET_USER_COURSES', null);
            commit('SET_USER_LESSONS', []);
            commit('SET_INITIATED', false);
        },

        updateProfile({ commit, dispatch }, data) {
            return new Promise((resolve) => {
                axios.post('profile/update', data)
                    .then(res => {
                        commit('SET_USER_DETAILS', res.data.data);
                        dispatch('MessageState/addInfoMessage', {message: 'פרטי המשתמש עודכנו בהצלחה'}, {root:true});
                    }).catch(() => {
                        dispatch('MessageState/addInfoMessage', {
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
                        dispatch('MessageState/addInfoMessage', {message: 'נשלח מייל לאישור בקשת עדכון המייל'}, {root:true});
                    }).catch(() => {
                        dispatch('MessageState/addInfoMessage', {
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
                        dispatch('MessageState/addInfoMessage', {message: 'הסיסמה עודכנה בהצלחה'}, {root:true});
                        resolve(res.data)
                    }).catch(err => {
                        dispatch('MessageState/addInfoMessage', {
                            message: 'מצטערים אך לא הצלחנו לעדכן את הסיסמה',
                            type: 'error',
                        }, {root:true});
                        resolve(err.response.data)
                    }).finally(() => {
                        resolve()
                    })
                })
        },

        getProfile({ commit, dispatch }) {
            axios.get('profile')
                .then(res => {
                    const details = res.data.data.details;
                    details.email = res.data.data.email;
                    commit('SET_USER_PROFILE', details);
                })
                .catch(() => {
                    dispatch('MessageState/addInfoMessage', {
                        message: 'מצטערים אבל נכשלה הבקשה למשיכת פרטי הפרופיל',
                        type: 'error',
                    }, {root:true});
                    Auth.logout()
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
                    dispatch('MessageState/addInfoMessage', {
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
                    dispatch('MessageState/addInfoMessage', {
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
                    dispatch('MessageState/addInfoMessage', {
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
                        dispatch('MessageState/addInfoMessage', {
                            message: 'מצטערים אבל נכשלה הבקשה למשיכת פרטים על התקדמות הקורס',
                            type: 'error',
                        }, {root:true});
                    })
            })
        },
        
        clearUserContent({ commit }) {
            commit('SET_USER_PROGRESS', null);
            commit('SET_USER_COURSES', null);
            commit('SET_USER_LESSONS', []);
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
                        dispatch('MessageState/addInfoMessage', {
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
                        dispatch('MessageState/addInfoMessage', {
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
                    if('/signin' === window.location.pathname) {
                        return router.push('/');
                    }
                    
                    return;
                }
                
                let lesson = state.lastActive ? state.lessons.find(lesson => lesson.id == state.lastActive.id) : null;
                let route       = lesson ? '/courses/' + lesson.course_id : '/'; 
                
                if(!lesson && courses) {
                    route = '/courses/' + courses[0].id;
                }
                
                if(route === window.location.pathname) {
                    return;
                }
                
                router.push(route)
            } catch(error) {
                console.error(error);
                router.push('/');
            }
        },

        updateUserVideoProgress({ commit }, data) {
            return new Promise((resolve, reject) => {
                axios.post(`profile/lesson/progress`, data)
                    .then(res => {
                        commit('UPDATE_USER_PROGRESS', res.data.data);
                    }).catch(err => {
                        reject(err.response);
                    }).finally(() => {
                        resolve()
                    });
            })
        },

        submitChallenge({ commit, dispatch }, data) {
            console.log('submitChallenge', data);
            // axios.get('profile/challenge/submit/' + data.id)
            //     .then(res => {
            //         commit('SET_ACTIVE_CHALLENGE', res.data.data);
            //     })
            //     .catch(() => {
            //         dispatch('MessageState/addInfoMessage', {
            //             message: 'מצטערים אבל נכשלה הבקשה להגשת האתגר',
            //             type: 'error',
            //         }, {root:true});
            //         Auth.logout()
            //     })
        },

        // eslint-disable-next-line no-empty-pattern
        saveUserLandedOnPageNotFound({}, path) {
            axios.get('profile/landed-on-page-not-found?path=' + encodeURIComponent(path))
        },
        
       saveLessonDateInCalendar({ commit }, lesson) {
           commit('UPDATE_SCHEDULE_DATE', lesson);
           return new Promise((resolve) => {
                axios.post('profile/lesson/schedule', {
                    id:     lesson.scheduleId,
                    date:   lesson.date,
                })
                .then(res => {
                    return resolve(res.data.data);
                })
                .catch(err => {
                    warning(err);
                })
            })
       },
        
       createTrainingSchedule({ commit }, newTrainingSchedule) {
            return new Promise((resolve) => {
                axios.post('profile/lesson/training-schedule', {
                    date:      newTrainingSchedule.date,
                    lesson_id: newTrainingSchedule.lessonId,
                    course_id: newTrainingSchedule.courseId,
                })
                .then(res => {
                        newTrainingSchedule.id = res.data.data.id;
                        commit('CREATE_TRAINING_SCHEDULE', newTrainingSchedule);
                        return resolve(res.data.data);
                    })
                    .catch(err => {
                        warning(err);
                    })
            })
       },
        
       updateTrainingSchedule({ commit }, updatedTrainingSchedule) {
            commit('UPDATE_SCHEDULE_DATE', updatedTrainingSchedule);

            return new Promise((resolve) => {
                axios.post('profile/lesson/training-schedule/' + updatedTrainingSchedule.scheduleId, {
                    date:      updatedTrainingSchedule.date
                })
                .then(res => {
                    return resolve(res.data.data);
                })
                .catch(err => {
                    warning(err);
                })
            })
       },
        
       deleteTrainingSchedule({ commit }, scheduleId) {
            commit('DELETE_SCHEDULE_DATE', scheduleId);

            return new Promise((resolve) => {
                axios.delete('profile/lesson/training-schedule/' + scheduleId)
                .then(res => {
                    return resolve(res.data.data);
                })
                .catch(err => {
                    warning(err);
                })
            })
       },

    }
};

export default UserState;