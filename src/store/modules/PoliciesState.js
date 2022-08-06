import axios from "axios";

const PoliciesState = {
    namespaced: true,

    state: {
        termsAndConditions: null,
    },

    getters: {
        termsAndConditions: state   => state.termsAndConditions,
    },

    mutations: {
        SET_TERMS_AND_CONDITIONS(state, termsAndConditions) {
            state.termsAndConditions = termsAndConditions;
        }
    },

    actions: {
        getTermsAndConditions({ state, commit, dispatch }) {
            if(state.getTermsAndConditions) {
                return state.getTermsAndConditions;
            }

            axios.get('policies/terms-and-conditions')
                .then(res => {
                    commit("SET_TERMS_AND_CONDITIONS", res.data.data)
                })
                .catch(() => {
                    dispatch('MessageState/addInfoMessage', {
                        message: 'מצטערים אבל נכשלה הבקשה למשיכת תנאי האתר',
                        type: 'error',
                    }, {root:true});
                })
        },
    }
};

export default PoliciesState;