import axios from "axios";
import Auth from '../../helpers/Auth'

const ChallengeState = {
    namespaced: true,

    state: {
        activeChallenge: null,
    },

    getters: {
        activeChallenge: state => state.activeChallenge,
    },

    mutations: {
        SET_ACTIVE_CHALLENGE(state, activeChallenge) {
            state.activeChallenge = activeChallenge;
        },
    },

    actions: {
        getActiveChallenge({ commit, dispatch }) {
            axios.get('content/challenges/active-challenge')
                .then(res => {
                    commit('SET_ACTIVE_CHALLENGE', res.data.data);
                })
                .catch(() => {
                    dispatch('MessageState/addInfoMessage', {
                        message: 'מצטערים אבל נכשלה הבקשה למשיכת אתגר השבוע',
                        type: 'error',
                    }, {root:true});
                })
        },
    }
};

export default ChallengeState;