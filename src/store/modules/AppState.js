const AppState = {
    namespaced: true,

    state: {
        isMenuDark: false
    },

    getters: {
        isMenuDark: state   => state.isMenuDark,
    },

    mutations: {
        SET_MENU_DARK_MODE(state, menuState) {
            state.isMenuDark = menuState;
        },
    },

    actions: {
        setMenuMode({ commit }, state) {
            console.log('setMenuMode', state);
            commit('SET_MENU_DARK_MODE', state)
        },

    }
};

export default AppState;