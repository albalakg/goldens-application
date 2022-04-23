import axios from "axios";
import router from '../../router';

const UserState = {
    namespaced: true,

    state: {
        progress: null,
        courses: null,
        supportTickets: [],
        profile: [],
        lastActive: null,
        favorites: [],
        orders: [],
        courseAreas: [],
        lessons: [],
    },

    getters: {
        // unchecked
        supportTickets: state   => state.supportTickets,
        progress:       state   => state.progress,
        favorites:      state   => state.favorites,
        orders:         state   => state.orders,
        profile:        state   => state.profile,

        // checked
        courses:        state   => state.courses,
        courseAreas:    state   => state.courseAreas,
        lessons:        state   => state.lessons,
        firstName:      state   => state.profile.first_name,
        lastName:       state   => state.profile.last_name,
        fullName:       state   => state.profile.first_name + ' ' + state.profile.last_name,
        phone:          state   => state.profile.phone,
        lastActive:     state   => state.lastActive,
    },

    mutations: {
        SET_USER_PROFILE(state, userProfile) {
            state.profile = userProfile;
        },
        
        SET_USER_SUPPORT_TICKETS(state, userSupportTickets) {
            state.supportTickets = userSupportTickets;
        },

        SET_USER_PROGRESS(state, userProgress) {
            state.progress = userProgress;
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

        SET_USER_LESSONS(state, lessons) {
            state.lessons = lessons;
        },

    },

    actions: {
        getProfile({ commit }) {
            axios.get('profile')
                .then(res => {
                    commit('SET_USER_PROFILE', res.data.data);
                })
                .catch(err => {
                    dispatch('MessageState/addMessage', {
                        message: 'מצטערים אבל נכשלה הבקשה למשיכת פרטי הפרופיל',
                        type: 'error',
                    }, {root:true});
                })
        },
        
        getSupportTickets({ commit }) {
            axios.get('profile/support-tickets')
                .then(res => {
                    commit('SET_USER_SUPPORT_TICKETS', res.data.data);
                })
                .catch(err => {
                    dispatch('MessageState/addMessage', {
                        message: 'מצטערים אבל נכשלה הבקשה למשיכת פרטי הבקשות תמיכה',
                        type: 'error',
                    }, {root:true});
                })
        },
        
        getOrders({ commit }) {
            axios.get('profile/orders')
                .then(res => {
                    commit('SET_USER_ORDERS', res.data.data);
                })
                .catch(err => {
                    dispatch('MessageState/addMessage', {
                        message: 'מצטערים אבל נכשלה הבקשה למשיכת פרטי הסטוריית ההזמנות',
                        type: 'error',
                    }, {root:true});
                })
        },
        
        getFavorites({ commit }) {
            axios.get('profile/favorites')
                .then(res => {
                    commit('SET_USER_FAVORITES', res.data.data);
                })
                .catch(err => {
                    dispatch('MessageState/addMessage', {
                        message: 'מצטערים אבל נכשלה הבקשה למשיכת השיעורים המועדפים',
                        type: 'error',
                    }, {root:true});
                })
        },
        
        getProgress({ state, commit }) {
            return new Promise((resolve, reject) => {
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
                    .catch(err => {
                        dispatch('MessageState/addMessage', {
                            message: 'מצטערים אבל נכשלה הבקשה למשיכת פרטים על התקדמות הקורס',
                            type: 'error',
                        }, {root:true});
                    })
            })
        },
        
        getCourses({ commit, state }, courses) {
            return new Promise((resolve, reject) => {
                if(state.courses) {
                    resolve(state.courses);
                    return 
                }

                axios.get('profile/courses')
                    .then(res => {
                        commit('SET_USER_COURSES', res.data.data);
                        resolve(state.courses);
                    })
                    .catch(err => {
                        dispatch('MessageState/addMessage', {
                            message: 'מצטערים אבל נכשלה הבקשה למשיכת התכנים שלך',
                            type: 'error',
                        }, {root:true});
                    })
            })
        },
        
        setUserProfile({ commit }, profile) {
            delete profile.token;
            profile.full_name = profile.first_name + ' ' + profile.last_name;
            commit('SET_USER_PROFILE', profile);
        },
        
        async goToLastActiveCourse({ state, dispatch }, currentPath) {
            try {
                const lesson    = state.lessons.find(lesson => lesson.id == lastActiveLesson.id);
                const courses   = state.courses;
                let route       = lesson ? '/courses/' + lesson.course_id : '/'; 

                if(!lesson && courses) {
                    route = '/courses/' + courses[0].id;
                }

                if(route === currentPath) {
                    return;
                }

                router.push(route)
            } catch(error) {
                console.error(error);
                
                router.push('/');
            }
        },

    }
};

export default UserState;