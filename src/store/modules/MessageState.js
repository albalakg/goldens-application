const DEFAULT_MESSAGE_OPTIONS = {
    time: 5000,
    color: 'green',
    message: 'הפעולה הסתיימה בהצלחה'
};

const COLORS = {
    error: 'red',
    info: 'green'
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
                time: 100000,
                // time:       options && options.time        ? options.time          : DEFAULT_MESSAGE_OPTIONS.time,
                color:      options && options.type        ? COLORS[options.type]  : DEFAULT_MESSAGE_OPTIONS.color,
                type:       options && options.type        ? COLORS[options.type]  : DEFAULT_MESSAGE_OPTIONS.error,
                message:    options && options.message     ? options.message       : DEFAULT_MESSAGE_OPTIONS.message,
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
        addMessage({ commit, dispatch }, options) {
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
                        clearTimeout(show_messages_interval);
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