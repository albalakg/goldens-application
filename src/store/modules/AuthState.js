const AuthState = {
    namespaced: true,

    state: {
        isLogged: false
    },

    getters: {
        isLogged: state => state.isLogged
    },

    mutations: {
        SET_LOG_STATUS(state, status) {
            state.isLogged = status;
        }
    },

    actions: {
       setLogStatus({ commit }, status) {
           commit('SET_LOG_STATUS', status);
       }
    }
};

export default AuthState;