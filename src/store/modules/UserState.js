import axios from "axios";

const UserState = {
    namespaced: true,

    state: {
        user: null,
    },

    getters: {
        user:           state   => state.user,
        profile:        state   => state.user.profile,
        supportTickets: state   => state.user.supportTickets,
        progress:       state   => state.user.progress,
        favorites:      state   => state.user.favorites,
        orders:         state   => state.user.orders,
        courses:        state   => state.user.courses,
    },

    mutations: {
        SET_USER(state) {
            state.user = {
                profile:        null,
                supportTickets: null,
                progress:       null,
                favorites:      null,
                orders:         null,
                courses:        null,
            };
        },
        
        SET_USER_PROFILE(state, userProfile) {
            state.user.profile = userProfile;
        },
        
        SET_USER_SUPPORT_TICKETS(state, userSupportTickets) {
            state.user.supportTickets = userSupportTickets;
        },

        SET_USER_PROGRESS(state, userProgress) {
            state.user.progress = userProgress;
        },

        SET_USER_FAVORITES(state, userFavorites) {
            state.user.favorites = userFavorites;
        },

        SET_USER_ORDERS(state, userOrders) {
            state.user.orders = userOrders;
        },

        SET_USER_COURSES(state, userCourses) {
            state.user.courses = userCourses;
        },

    },

    actions: {
        getProfile({ state, commit }) {
            axios.get('profile')
                .then(res => {
                    if(!state.user) {
                        commit('SET_USER');
                    }

                    commit('SET_USER_PROFILE', res.data.data);
                })
                .catch(err => {
                    dispatch('MessageState/addMessage', {
                        message: 'Failed to fetch your profile',
                        type: 'error',
                    }, {root:true});
                })
        },
        
        getSupportTickets({ state, commit }) {
            axios.get('profile/support-tickets')
                .then(res => {
                    if(!state.user) {
                        commit('SET_USER');
                    }

                    commit('SET_USER_SUPPORT_TICKETS', res.data.data);
                })
                .catch(err => {
                    dispatch('MessageState/addMessage', {
                        message: 'Failed to fetch your support tickets',
                        type: 'error',
                    }, {root:true});
                })
        },
        
        getOrders({ state, commit }) {
            axios.get('profile/orders')
                .then(res => {
                    if(!state.user) {
                        commit('SET_USER');
                    }

                    commit('SET_USER_ORDERS', res.data.data);
                })
                .catch(err => {
                    dispatch('MessageState/addMessage', {
                        message: 'Failed to fetch your orders',
                        type: 'error',
                    }, {root:true});
                })
        },
        
        getFavorites({ state, commit }) {
            axios.get('profile/favorites')
                .then(res => {
                    if(!state.user) {
                        commit('SET_USER');
                    }

                    commit('SET_USER_FAVORITES', res.data.data);
                })
                .catch(err => {
                    dispatch('MessageState/addMessage', {
                        message: 'Failed to fetch your favorites',
                        type: 'error',
                    }, {root:true});
                })
        },
        
        getProgress({ state, commit }) {
            axios.get('profile/progress')
                .then(res => {
                    if(!state.user) {
                        commit('SET_USER');
                    }

                    commit('SET_USER_PROGRESS', res.data.data);
                })
                .catch(err => {
                    dispatch('MessageState/addMessage', {
                        message: 'Failed to fetch your progress',
                        type: 'error',
                    }, {root:true});
                })
        },
        
        getCourses({ state, commit }) {
            axios.get('profile/courses')
                .then(res => {
                    if(!state.user) {
                        commit('SET_USER');
                    }

                    commit('SET_USER_COURSES', res.data.data);
                })
                .catch(err => {
                    dispatch('MessageState/addMessage', {
                        message: 'Failed to fetch your courses',
                        type: 'error',
                    }, {root:true});
                })
        },

    }
};

export default UserState;