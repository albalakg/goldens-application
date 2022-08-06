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
        getSupportCategories({ state, commit, dispatch }) {
            if(state.getSupportCategories) {
                return state.getSupportCategories;
            }

            axios.get('support/categories')
                .then(res => {
                    commit("SET_SUPPORT_CATEGORIES", res.data.data)
                })
                .catch(() => {
                    dispatch('MessageState/addInfoMessage', {
                        message: 'מצטערים אבל נכשלה הבקשה למשיכת קטגוריות הקורסים',
                        type: 'error',
                    }, {root:true});
                })
        },

        // eslint-disable-next-line no-empty-pattern
        async createSupportTicket({ }, newSupportTicket) {
            try {
                return new Promise((resolve, reject) => {
                    axios.post('support/create', newSupportTicket)
                        .then(res => {
                            resolve(res.data.data);
                        })
                        .catch(() => {
                            reject();
                        })
                })
            } catch(err) {
                console.error(err);
            }
        },

        createSupportTicketMessage({ dispatch }) {
            axios.post('support/message/create')
                .then(() => {

                })
                .catch(() => {
                    dispatch('MessageState/addInfoMessage', {
                        message: 'מצטערים אבל נכשלה הבקשה ליצירת הודעה על בקשת תמיכה',
                        type: 'error',
                    }, {root:true});
                })
        },
    }
};

export default SupportState;