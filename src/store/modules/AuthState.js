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
            return new Promise((resolve) => {
                commit('SET_LOG_STATUS', status);
                resolve();
            })
       }
    }
};

export default AuthState;