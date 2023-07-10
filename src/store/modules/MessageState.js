const DEFAULT_MESSAGE_OPTIONS = {
    time: 3000,
    message: 'הפעולה הסתיימה בהצלחה',
    type: 'info'
};


let message_timeout = null;
let show_messages_interval = null;

const MessageState = {
    namespaced: true,

    state: {
        messages_queue: [],
        options: {},
        status: false
    },

    getters: {
        options: state => state.options,
        status: state => state.status,
        messages_in_queue: state => state.messages_queue,
    },

    mutations: {
        ADD_MESSAGE(state, options) {
            state.messages_queue.push({
                time:       options && options.time         ? options.time          : DEFAULT_MESSAGE_OPTIONS.time,
                type:       options && options.type         ? options.type          : DEFAULT_MESSAGE_OPTIONS.type,
                message:    options && options.message      ? options.message       : DEFAULT_MESSAGE_OPTIONS.message,
                title:      options && options.title        ? options.title         : DEFAULT_MESSAGE_OPTIONS.title,
            });
        },

        SET_MESSAGE(state) {
            if(!state.messages_queue.length) {
                return;
            }

            clearTimeout(message_timeout);

            state.options = {...state.messages_queue[0]};
            state.messages_queue.shift();
            state.status = true;

            message_timeout = setTimeout(() => {
                state.status = false;
            }, state.options.time)
        },

        SET_MESSAGE_OFF(state) {
            state.status = false;
        },

        TRUNCATE_MESSAGES(state) {
            state.messages_queue = [];
        }
    },

    actions: {
        addInfoMessage({ commit, dispatch }, options) {
            options.type = 'info';
            dispatch('messageQueueWorker');
            commit('ADD_MESSAGE', options)
        },

        addSuccessMessage({ commit, dispatch }, options) {
            options.type = 'success';
            dispatch('messageQueueWorker');
            commit('ADD_MESSAGE', options)
        },

        addWarningMessage({ commit, dispatch }, options) {
            options.type = 'warning';
            dispatch('messageQueueWorker');
            commit('ADD_MESSAGE', options)
        },
        
        addErrorMessage({ commit, dispatch }, options) {
            options.type = 'error';
            dispatch('messageQueueWorker');
            commit('ADD_MESSAGE', options)
        },

        messageQueueWorker({ state, commit }) {
            if(!show_messages_interval) {
                show_messages_interval = setInterval(() => {
                    if(!state.messages_queue.length) {
                        clearInterval(show_messages_interval);
                        return show_messages_interval = null;
                    }

                    if(state.status) {
                        return;
                    }

                    commit('SET_MESSAGE')    
                }, 1000);
            }
        },

        hideMessage({ commit }) {
            commit('SET_MESSAGE_OFF')
        },

        truncate({ commit }) {
            commit('SET_MESSAGE_OFF');
            commit('TRUNCATE_MESSAGES');
        }
    }
};

export default MessageState;