const AppState = {
    namespaced: true,

    state: {
        isMenuDark: false,
        isLoading: false,
    },

    getters: {
        isMenuDark: state   => state.isMenuDark,
        isLoading:  state   => state.isLoading,
    },

    mutations: {
        SET_MENU_DARK_MODE(state, menuState) {
            state.isMenuDark = menuState;
        },
        SET_IS_LOADING_STATE(state, isLoading) {
            state.isLoading = isLoading;
        },
    },

    actions: {
        setMenuMode({ commit }, state) {
            commit('SET_MENU_DARK_MODE', state)
        },

        setIsLoadingState({ commit }, isLoading) {
            commit('SET_IS_LOADING_STATE', isLoading)
        },

    }
};

export default AppState;