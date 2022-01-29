import axios from "axios";

const UserState = {
    namespaced: true,

    state: {
        supportTickets: [],
        profile: [],
        lastActive: {},
        progress: [],
        favorites: [],
        orders: [],
        courses: [],
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
                        message: 'Failed to fetch your profile',
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
                        message: 'Failed to fetch your support tickets',
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
                        message: 'Failed to fetch your orders',
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
                        message: 'Failed to fetch your favorites',
                        type: 'error',
                    }, {root:true});
                })
        },
        
        getProgress({ commit }) {
            return new Promise((resolve, reject) => {
                axios.get('profile/progress')
                    .then(res => {
                        commit('SET_USER_PROGRESS', res.data.data.courses);
                        commit('SET_USER_LAST_ACTIVE', res.data.data.last_active_lesson);
                        resolve(res.data.data);
                    })
                    .catch(err => {
                        dispatch('MessageState/addMessage', {
                            message: 'Failed to fetch your progress',
                            type: 'error',
                        }, {root:true});
                    })
            })
        },
        
        setCourses({ commit }, courses) {
            commit('SET_USER_COURSES', courses);
            courses.forEach(course => {
                commit('SET_USER_COURSE_AREAS', course.full_course.active_areas_with_active_lessons);
                course.full_course.active_areas_with_active_lessons.forEach(course_area => {
                    commit('SET_USER_LESSONS', course_area.active_lessons);
                })
            })
        },
        
        setUserProfile({ commit }, profile) {
            delete profile.token;
            profile.full_name = profile.first_name + ' ' + profile.last_name;
            commit('SET_USER_PROFILE', profile);
        },

    }
};

export default UserState;