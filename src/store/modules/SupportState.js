import axios from "axios";

const SupportState = {
    namespaced: true,

    state: {
        supportCategories: null,
    },

    getters: {
        supportCategories: state   => state.supportCategories,
    },

    mutations: {
        SET_SUPPORT_CATEGORIES(state, supportCategories) {
            function compare( a, b ) {
                if ( a.name < b.name ){
                  return -1;
                }
                if ( a.name > b.name ){
                  return 1;
                }
                return 0;
            }

            state.supportCategories = supportCategories.sort(compare);
        },

    },

    actions: {
        getSupportCategories({ state, commit }) {
            if(state.getSupportCategories) {
                return state.getSupportCategories;
            }

            axios.get('support/categories')
                .then(res => {
                    commit("SET_SUPPORT_CATEGORIES", res.data.data)
                })
                .catch(err => {
                    dispatch('MessageState/addMessage', {
                        message: 'מצטערים אבל נכשלה הבקשה למשיכת קטגוריות הקורסים',
                        type: 'error',
                    }, {root:true});
                })
        },

        async createSupportTicket({ }, newSupportTicket) {
            try {
                return new Promise((resolve, reject) => {
                    axios.post('support/create', newSupportTicket)
                        .then(res => {
                            resolve(res.data.data);
                        })
                        .catch(err => {
                            reject();
                        })
                })
            } catch(err) {
                console.log(err);
            }
        },

        createSupportTicketMessage({ commit }) {
            axios.post('support/message/create')
                .then(res => {

                })
                .catch(err => {
                    dispatch('MessageState/addMessage', {
                        message: 'מצטערים אבל נכשלה הבקשה ליצירת הודעה על בקשת תמיכה',
                        type: 'error',
                    }, {root:true});
                })
        },
    }
};

export default SupportState;